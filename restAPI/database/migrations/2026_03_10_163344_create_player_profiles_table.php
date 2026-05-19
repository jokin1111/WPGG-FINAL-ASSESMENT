<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('player_profiles', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete()
                ->unique();

            $table->string('summoner_name')->nullable();
            $table->string('riot_region')->nullable();

            $table->string('preferred_role')->nullable()->index();
            $table->string('secondary_role')->nullable();

            $table->string('rank_tier')->nullable()->index();

            $table->text('availability_text')->nullable();
            $table->text('bio')->nullable();

            $table->boolean('is_public')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('player_profiles');
    }
};
