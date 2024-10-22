<template>
    <div id="footPrimary">
        Copyright © {{ currentYear }} SoRaang All Rights Reserved.
    </div> <!-- #footPrimary -->
</template> <!-- Template Ends -->

<script setup>
    const currentYear = new Date().getFullYear();
</script> <!-- Logic Ends -->