<?php

namespace App\Http\Middleware;

use App\Models\Role;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EmployerMiddleware
{

    public function handle(Request $request, Closure $next): Response
    { {
            try {
                $user = Auth::user();

                if ($user && $user->role_id == Role::where('role', 'employer')->first()->id) {
                    return $next($request);
                }
            } catch (\Throwable $e) {
                return response()->json([
                    'message' => 'Unauthorized',
                ], 401);
            }
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }
    }
}
