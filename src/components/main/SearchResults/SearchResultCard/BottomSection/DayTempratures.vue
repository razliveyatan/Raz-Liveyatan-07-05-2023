<template>
    <div class="daily-temprature-container">
        <span class="high">24°</span>
        <span class="low">/17°</span>
    </div>
</template>

<style scoped>
.daily-temprature-container{
    align-self: center;
    white-space: nowrap;
}

.high {
    font-size: 50.6px;
    letter-spacing: -.42px;
    line-height: 1.07;
    font-weight: 500;
}

.low {
    font-size: 20.3px;
    line-height: .92;
    color: #878787;
}
</style>