const code =
`<template>
    <div>
        <input v-model="message">
        {{ message }}
    </div>
</template>
<script>
    export default {
        data () {
            return {
                message: 'xijia'
            }
        }
    }
</script>`;

export default code;