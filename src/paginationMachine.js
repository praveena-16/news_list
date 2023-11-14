// paginationMachine.js
import { createMachine, assign } from "xstate";

export const paginationMachine = createMachine({
  id: "pagination",
  initial: "idle",
  context: {
    currentPage: 1,
    data: [],
  },
  states: {
    idle: {
      on: {
        FETCH: "loading",
        NEXT: {
          target: "loading",
          actions: assign({
            currentPage: (context) => context.currentPage + 1,
          }),
        },
        PREVIOUS: {
          target: "loading",
          actions: assign({
            currentPage: (context) =>
              context.currentPage > 1 ? context.currentPage - 1 : 1,
          }),
        },
      },
    },
    loading: {
      invoke: {
        src: "fetchPage",
        onDone: {
          target: "idle",
          actions: assign({
            data: (context, event) => event.data,
          }),
        },
        onError: {
          target: "idle",
        },
      },
    },
  },
});
