<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class EmployerController extends Controller
{
    public function addEmployee (Request $request) {
        try {
            $request->validate([
                'name' => 'required|string|between:2,100',
                'email' => 'required|string|email|max:100|unique:users',
                'password' => 'required|string|min:6',
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
        $role = Role::where('role', 'employee')->first();
        $employer_id = auth()->user()->id;
        $user = new User;

        $user->name = $request->name;
        $user->email = $request->email;
        $user->role_id = $role->id;
        $user->password = Hash::make($request->password);
        $user->save();

        DB::table('employers_employees')->insert([
            'employer_id' => $employer_id,
            'employee_id' => $user->id,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'message' => 'Employee added successfully'
        ], 200);
    }

    public function getEmployees () {
        $employer = auth()->user();
        $employees = $employer->employees()->get();
        return response()->json([
            'message' => 'Employees fetched successfully',
            'employees' => $employees
        ], 200);
    }
}
