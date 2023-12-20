<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('employers_employees', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('employer_id')->nullable(false);
            $table->foreign('employer_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

            $table->unsignedBigInteger('employee_id')->nullable(false);
            $table->foreign('employee_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
                
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('employers_employees');
    }
};
