<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TasksController extends Controller
{
    public function getTasks()
    {
        $user = Auth::user();

        $role = $user->role()->first()->role;

        if ($role === 'employee') {
            $tasks = $user->employer()->first()->tasks()->get();
        } else {
            $tasks = $user->tasks()->get();
        }

        return response()->json([
            'message' => 'successfully fetched tasks',
            'tasks' => $tasks
        ]);
    }

    public function addTask(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|string|between:2,100',
                'description' => 'required|string|between:2,100',
                'due_date' => 'required|date',
            ]);
        } catch (\Throwable $e) {
            return response()->json(
                [
                    "message" => 'validation failed',
                    "error" => $e->getMessage()
                ],
                422
            );
        }

        $user = Auth::user();

        $task = new Task();
        $task->title = $request->title;
        $task->description = $request->description;
        $task->due_date = $request->due_date;
        $task->user_id = $user->id;
        $task->save();

        return response()->json([
            'message' => 'successfully added task',
            'task' => $task
        ]);
    }

    public function editTask(Request $request, $taskId)
    {
        try {
            $taskData = $request->validate([
                'title' => 'prohibited',
                'description' => 'prohibited',
                'stage' => 'required|integer|between:1,100',
                'due_date' => 'prohibited',
            ]);
        } catch (\Throwable $e) {
            return response()->json(
                [
                    "message" => 'validation failed',
                    "error" => $e->getMessage()
                ],
                422
            );
        }

        try {
            $task = Task::findOrFail($taskId);
            $task->update($taskData);
            return response()->json([
                'message' => 'Task updated successfully',
                'book' => $task
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Failed to update task',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
