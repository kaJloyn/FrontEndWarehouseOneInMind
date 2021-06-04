<template>
    <div>
        <p>ajde</p>
    </div>
</template>

<script>
    export default {
        name: "ssl",
        data(){
            return {
                file: this.getFile()
            }
        },
        methods: {
            getFile(){
                fetch('A0B533D9DA7B30CE0EB572EBE3D1476D.txt')
                    .then(response => response.text())
                    .then(text => console.log(text))
            }
        }

    }


</script>
<style></style>

