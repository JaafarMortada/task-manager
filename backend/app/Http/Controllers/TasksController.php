<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TasksController extends Controller
{
    public function getTasks()
    {
        $user = Auth::user();

        $role = $user->role()->first()->role;
        
        if ($role === 'employee') {
            $tasks = $user->employer()->first()->tasks()->where('employee_id', $user->id)->orderBy('created_at', 'desc')->orderBy('created_at', 'desc')->get();
                   
        } else {
            $tasks = $user->tasks()->orderBy('created_at', 'desc')->get();
        }
        $tasks->each(function ($task) {
            $task->load('assignedEmployee');
        }); 
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
                'employee_id' => 'required|integer|exists:users,id'
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
        $employee = User::find($request->employee_id);
    
        if ($user->role()->first()->role !== 'employer' || !$employee || !$user->employees()->get()->contains('id', $request->employee_id)) {
            return response()->json([
                'message' => 'failed to assign task',
            ], 422);
        }
        $task = new Task();
        $task->title = $request->title;
        $task->description = $request->description;
        $task->due_date = $request->due_date;
        $task->user_id = $user->id;
        $task->employee_id = $request->employee_id;
        $task->save();
        $task->load('assignedEmployee');
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
                'employee_id' => 'prohibited',
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

        if(Auth::user()->role_id == Role::where('role', 'employer')->first()->id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
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
