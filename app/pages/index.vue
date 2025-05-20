<script setup>
import { motion } from "motion-v"
</script>
<template>
    <div>
        <motion.h1
            class="mt-16 text-center font-serif text-4xl font-semibold"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.1 }"
        >
            <span class="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">AI</span>-Powered
            <br>
            <span class="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Scientific</span>&nbsp;
            <span class="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">Collaboration</span>
        </motion.h1>
        <motion.p
            class="mx-auto mt-8 max-w-2xl text-center text-lg text-gray-600"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.2 }"
        >
            Revolutionize your research workflow with AI-driven tools for seamless collaboration, data analysis, and
            knowledge discovery.
        </motion.p>

        <motion.div
            class="mt-12 flex justify-center gap-4"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.4 }"
        >
            <UButton color="blue" size="lg">
Get Started
</UButton>
            <UButton color="gray" variant="soft" size="lg">
Learn More
</UButton>
        </motion.div>

        <motion.div
            class="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 px-4 md:grid-cols-3"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, delay: 0.6 }"
        >
            <UCard>
                <template #header>
                    <h3 class="text-xl font-semibold">
Smart Collaboration
</h3>
                </template>
                <p class="text-gray-600">
Connect with researchers worldwide and collaborate on projects seamlessly.
</p>
            </UCard>
            <UCard>
                <template #header>
                    <h3 class="text-xl font-semibold">
AI Analysis
</h3>
                </template>
                <p class="text-gray-600">
Leverage advanced AI tools to analyze research data and extract insights.
</p>
            </UCard>
            <UCard>
                <template #header>
                    <h3 class="text-xl font-semibold">
Knowledge Hub
</h3>
                </template>
                <p class="text-gray-600">
Access a vast network of scientific resources and expert knowledge.
</p>
            </UCard>
        </motion.div>
    </div>
</template>
