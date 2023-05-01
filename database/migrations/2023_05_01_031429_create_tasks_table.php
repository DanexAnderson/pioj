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
        Schema::create('tasks', function (Blueprint $table) {
            // $table->id();
            $table->bigIncrements('task_no'); 
            $table->string('description');
            $table->date('due_date')->useCurrent();
            // $table->string('status');
            $table->set('status', ['not yet started', 'in progress', 'completed','past due']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
