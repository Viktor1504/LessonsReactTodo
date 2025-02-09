import { BaseResponse } from "common/types"
import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types"
import { baseApi } from "../../../app/baseApi"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (id) => `/todo-lists/${id}/tasks`,
      providesTags: ["Tasks"],
    }),
    addTask: build.mutation<BaseResponse<{ item: DomainTask }>, { id: string; title: string }>({
      query: ({ id, title }) => ({
        url: `/todo-lists/${id}/tasks`,
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Tasks"],
    }),
    removeTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: build.mutation<
      BaseResponse<{ item: DomainTask }>,
      {
        todolistId: string
        taskId: string
        model: UpdateTaskModel
      }
    >({
      query: ({ todolistId, taskId, model }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "PUT",
        body: model,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
})

export const { useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } = tasksApi
