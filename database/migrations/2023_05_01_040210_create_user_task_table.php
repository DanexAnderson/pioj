<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_task', function (Blueprint $table) {
            // $table->id();
            // $table->timestamps();
            $table->unsignedInteger('employee_no');
            $table->unsignedBigInteger('task_no');

            $table->foreign('employee_no')->references('employee_no')->on('users')->onDelete('cascade');
            $table->foreign('task_no')->references('task_no')->on('tasks')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_task');
    }
};
