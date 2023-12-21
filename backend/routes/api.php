<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\TasksController;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);    
});

Route::group([
    'middleware' => 'employer',
    'prefix' => 'employer'
], function () {
    Route::post('/add-employee', [EmployerController::class, 'addEmployee']);  
    Route::post('/add-task', [TasksController::class, 'addTask']);  
    Route::get('/get-employees', [EmployerController::class, 'getEmployees']);  
    Route::delete('/delete-employee/{id}', [EmployerController::class, 'deleteEmployee']);
});

Route::group([
    'prefix' => 'tasks'
], function () {
    Route::get('/get-all', [TasksController::class, 'getTasks']);  
    Route::post('/edit/{id}', [TasksController::class, 'editTask']);  
});
