<template >
    <v-table>
        <thead>
            <tr>
                <th>
                    id
                </th>

                <th>
                    Nome
                </th>

                <th>
                    Email
                </th>
                <th>

                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="u in Usuarios" :key="u.id">
                <td>{{ u.id }}</td>
                <td>{{ u.nome }}</td>
                <td>{{ u.email }}</td>
                <td>
                    <v-btn color="blue" class="text-white" @click="alterar(u.id)">Alterar Permissões</v-btn>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>
<script>
import router from '../router';
import { getAuth } from "firebase/auth";
export default {
    data() {
        return {
            Usuarios: []
        }
    },
    beforeMount() {
        this.isPermited()
    },
    methods: {
        async isPermited() {
            const auth = getAuth();
            const u = auth.currentUser;
            const req = await fetch(`${this.$baseUrlApiMain}/cadastro/email?email=${u.email}`);
            const datauser = await req.json();
            if (!datauser[0].alterar) {
                this.$store.state.error = true
                router.push('/index')
            }
        },
        async getUsers() {
            const req = await fetch(`${this.$baseUrlApiMain}/cadastro/read`)
            const data = await req.json();
            this.Usuarios = data;
        },
        alterar(id) {
            router.push(`alterar/${id}`)
        }
    },
    mounted() {
        this.getUsers()
    }
}
</script>
<style >

</style>