import {
  StateGraph,
  StateSchema,
  type GraphNode,
  type CompiledStateGraph,
  START,
  END,
} from "@langchain/langgraph";

import z from "zod";

import { mistralModel, cohereModel, googleModel } from "./models.service.js";

import {
  createAgent,
  HumanMessage,
  providerStrategy,
  toolStrategy,
} from "langchain";

const state = new StateSchema({
  problem: z.string().default(""),
  solution_1: z.string().default(""),
  solution_2: z.string().default(""),
  judge: z.object({
    solution_1_score: z.number().default(0),
    solution_2_score: z.number().default(0),
    solution_1_reasoning: z.string().default(""),
    solution_2_reasoning: z.string().default(""),
  }),
});

const solutionNode: GraphNode<typeof state> = async (state) => {
  const [mistralResponse, cohoreResponse] = await Promise.all([
    mistralModel.invoke(state.problem),
    cohereModel.invoke(state.problem),
  ]);

  return {
    solution_1: mistralResponse.text,
    solution_2: cohoreResponse.text,
  };
};

const judgeNode: GraphNode<typeof state> = async (state) => {
  const { problem, solution_1, solution_2 } = state;

  const judge = createAgent({
    model: googleModel,
    responseFormat: providerStrategy(
      z.object({
        solution_1_score: z.number().min(0).max(10),
        solution_2_score: z.number().min(0).max(10),
        solution_1_reasoning: z.string(),
        solution_2_reasoning: z.string(),
      }),
    ),
    systemPrompt: `You are a judge tasked with evaluting two solutions to a problem. The problem is: ${problem}. The first solution is: ${solution_1}. The second solution is: ${solution_2}. Please score each solution on a scale of 0 to 10, and provide reasoning for your scores.`,
  });

  const judgeResponse = await judge.invoke({
    messages: [
      new HumanMessage(
        `problem: ${problem}\nsolution 1: ${solution_1}\nsolution 2: ${solution_2}\nPlease provide your scores and reasoning.`,
      ),
    ],
  });

  const {
    solution_1_score,
    solution_2_score,
    solution_1_reasoning,
    solution_2_reasoning,
  } = judgeResponse.structuredResponse;

  return {
    judge: {
      solution_1_score,
      solution_2_score,
      solution_1_reasoning,
      solution_2_reasoning,
    },
  };
};

const graph = new StateGraph(state)
  .addNode("solution", solutionNode)
  .addNode("judgement", judgeNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judgement")
  .addEdge("judgement", END)
  .compile();

export default async function (problem: string) {
  const result = await graph.invoke({
    problem: problem,
  });

  return result;
}
