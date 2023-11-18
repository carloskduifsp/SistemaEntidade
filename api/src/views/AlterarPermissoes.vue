<template >
    <v-container>

        <v-table>
            <thead>
                <tr>
                    <th>
                        Permissão
                    </th>

                    <th>

                    </th>
                </tr>
            </thead>
            <tbody>

                <tr>
                    <td>Login</td>
                    <td>
                        <v-checkbox v-model="permissoes.login" @change="atualizar()"></v-checkbox>
                    </td>
                </tr>

                <tr>
                    <td>Alterar Permissões(Administrador)</td>
                    <td>
                        <v-checkbox v-model="permissoes.alterar" @change="atualizar()"></v-checkbox>
                    </td>

                </tr>
                <tr v-for="item in sistemas" :key="item">
                    <td>{{ item.nomesistema }}</td>
                    <td>
                        <v-checkbox v-model="permissoes.permissoes[`${item.nomesistema}`]"
                            @change="atualizar()"></v-checkbox>
                    </td>
                </tr>
                <!-- <tr>
                    <td>Coletas</td>
                    <td>
                        <v-checkbox v-model="permissoes.coletas" @change="atualizar()"></v-checkbox>
                    </td>

                </tr>
                <tr>
                    <td>Alterar Permissões</td>
                    <td>
                        <v-checkbox v-model="permissoes.alterar" @change="atualizar()"></v-checkbox>
                    </td>
                </tr>
                
                <tr>
                    <td>Lotes</td>
                    <td>
                        <v-checkbox v-model="permissoes.lotes" @change="atualizar()"></v-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>Sangrias</td>
                    <td>
                        <v-checkbox v-model="permissoes.sangrias" @change="atualizar()"></v-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>Parceiro</td>
                    <td>
                        <v-checkbox v-model="permissoes.parceiro" @change="atualizar()"></v-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>Sistemas</td>
                    <td>
                        <v-checkbox v-model="permissoes.sistemas" @change="atualizar()"></v-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>Coleta</td>
                    <td>
                        <v-checkbox v-model="permissoes.coleta" @change="atualizar()"></v-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>Relatórios</td>
                    <td>
                        <v-checkbox v-model="permissoes.relatorios" @change="atualizar()"></v-checkbox>
                    </td>
                </tr>
                <tr>
                    <td>ahahahahaha</td>
                    <td>
                        <v-checkbox v-model="permissoes.testerapa" @change="atualizar()"></v-checkbox>
                    </td>
                </tr> -->
            </tbody>
        </v-table>
    </v-container>
</template>
<script>
import { getAuth } from "firebase/auth";
import router from "../router";
export default {
    data() {
        return {
            permissoes: [],
            sistemas: [],
        }
    },
    mounted() {
        this.getUser()
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

        async getUser() {
            const req = await fetch(`${this.$baseUrlApiMain}/cadastro/read/${this.$route.params.id}`)
            const data = await req.json();

            this.permissoes = data[0]
            //console.log(this.permissoes)
            this.getSystem()
        },

        async getSystem() {

            const company = localStorage.getItem("company");
            let companyId = company.split("-");
            companyId = companyId[0];

            const req = await fetch(`${this.$baseUrlApiMain}/sistema/read/${companyId}`)
            const data = await req.json();
            this.sistemas = data
        },

        async atualizar() {
            const data = this.permissoes;
            const permissoesJson = JSON.stringify(data.permissoes)

            const data2 = {
                nome: data.nome,
                email: data.email,
                login: data.login,
                alterar: data.alterar,
                permissoes: permissoesJson

            }

            const dataJson = JSON.stringify(data2)

            const req = fetch(`${this.$baseUrlApiMain}/cadastro/update/${this.$route.params.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: dataJson
            });
            await req.json;


        }
    }
}
</script>
<style ></style>