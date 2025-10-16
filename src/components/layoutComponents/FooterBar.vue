<template>
  <q-footer class="flex" style="background: white; z-index: auto;">
      <q-toolbar class="q-my-lg footer-container">
        <q-toolbar-title class="q-mb-md footer-logo">
            <q-img src="../../assets/Logo_grande.png" fit="contain" loading="eager" class="footer-image"/>
        </q-toolbar-title>
        <section class="row footer-main">
          <div class="column col">
            <h2 class="footer-title">Inova RS</h2>
            <p class="footer-text">CEP: 90020-020</p>
            <p class="footer-text">CNPJ: 52.624.053/0001-06</p>
            <p class="footer-text">Av. Borges de Medeiros, 1.501, Praia de Belas</p>
            <p class="footer-text">Centro Administrativo Fernando Ferrari, 18º andar</p>
          </div>
          <div class="column col">
            <h2 class="footer-title">Sobre o Inova RS</h2>
            <a class="footer-text" href="https://sict.rs.gov.br/quem-somos" target="_blank">Quem somos</a>
            <a class="footer-text" href="https://sict.rs.gov.br/acesso-a-informacao" target="_blank">Acesso à informação</a>
            <a class="footer-text" href="https://sict.rs.gov.br/protecao-de-dados-pessoais" target="_blank">Proteção de Dados Pessoais</a>
          </div>
          <div class="column col">
            <h2 class="footer-title">Redes sociais</h2>
            <div class="row">
              <a class="footer-text" href="https://www.inova.rs.gov.br/conheca-inova-rs" target="_blank">Acompanhe o site do Inova Rs</a>
            </div>
          </div>
          <div class="column col">
            <h2 class="footer-title">Contate Inova</h2>
            <div class="row">
              <a class="footer-text" href="mailto:agrodosvales@gmail.com">agrodosvales@gmail.com</a>
            </div>
          </div >
        </section>
      </q-toolbar>
      <hr class="footer-hr" color="#E5E7EB"/>
      <p class="footer-copyright">© 2025 Agro dos Vales. Todos os direitos reservados.</p>
    </q-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'FooterBar'
})
</script>

<style scoped>

.footer-logo {
  display: flex;
  justify-content: center;
  flex: none;
  width: 30%;
}
.footer-image{
  max-width: 400px;
}

.footer-main {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 65%;
  gap: 16px;
}

.footer-title {
  font-weight: bold;
  color: var(--color-dark);
  font-size: 16px;
  line-height: normal;
}

.footer-text {
  color: #818181;
  font-size: 14px;
  margin: 0 0  10px;
}

.footer-hr {
  width: 90%;
  margin: 20px auto;
}

.footer-copyright {
  color: var(--color-dark);
  font-size: 14px;
  margin: 0 0 20px 5%;
}

@media screen and (max-width: 1024px) {
  .footer-container {
    display: flex;
    flex-direction: column;
  }
  .footer-main {
    width: 90%;
  }
}
@media screen and (max-width: 820px) {
  .footer-main {
    flex-direction: column;
  }
  .footer-logo {
    width: 90%;
  }
}
@media screen and (max-width: 420px) {
  .footer-copyright, .footer-text  {
    font-size: 12px;
  }
}
</style>
