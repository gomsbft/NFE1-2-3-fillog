<template>
    <div>
        <form @submit.prevent="login">
            <div>
                <label for="account">account:</label>
                <input v-model="form.account" id="account" type="email" required>
            </div>

            <div>
                <label for="password">password:</label>
                <input v-model="form.password" id="password" type="text" required>
            </div>

            <button type="submit">Login</button>
        </form>
    </div>
</template> <!-- Template Ends -->

<script setup>
    import { reactive, ref } from 'vue';
    import axios from 'axios';

    const form = reactive({
        account: '',
        password: '',
    });

    const errorMessage = ref('');
    const successMessage = ref('');

    const login = async () => {
        try {
            const formData = new FormData();

            formData.append('account', form.account);
            formData.append('password', form.password);

            const response = await axios.post('http://localhost:4000/user', formData)
        } catch(err) {
            console.error(err);
        }
    }
</script> <!-- Logic Ends -->