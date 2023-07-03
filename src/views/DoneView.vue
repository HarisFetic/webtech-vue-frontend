<template>
    <h1>Hier sehen Sie die bereits erledigten Übungen:</h1>
    <div class="table-container">
        <h2>Kraftübungen</h2>
        <table class="centered-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Repeat</th>
                    <th>Weight</th>
                </tr>
            </thead>
        </table>
    </div>
    <div class="table-container">
        <h2>Ausdauerübungen</h2>
        <table class="centered-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Time</th>
                </tr>
            </thead>
        </table>
    </div>
</template>

<style scoped>
.table-container {
    text-align: center;
    margin-bottom: 20px;
}

.centered-table {
    margin: 0 auto;
}
</style>