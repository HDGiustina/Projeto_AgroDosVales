<template>
    <section class="InfosPlantas">
        <h1>Sobre Plantas Bioativas</h1>
        <div class="InfosPlantas_text">
            <h2>O que são Plantas Bioativas?</h2>
            <p>Plantas bioativas são organismos vegetais que contêm compostos químicos capazes de interagir com sistemas biológicos, gerando efeitos benéficos na agricultura e na saúde. Esses compostos não são nutrientes básicos, mas atuam em diversas funções de defesa e crescimento, protegendo as culturas de estresses bióticos e abióticos.</p>
            <q-expansion-item
                switch-toggle-side
                label="Tipos Comuns de Plantas Bioativas na Agricultura"
                header-class="text-primary"
                class="Infosplantas_expand"
            >
                <ul class="InfosPlantas_lista">
                    <li><b>Plantas Inseticidas:</b> Como o Nim e o Piretro, que produzem compostos que repelem ou eliminam pragas de forma natural.</li>
                    <li><b>Plantas Fungicidas:</b> Exemplos incluem Alho e Cravo-da-Índia, cujos extratos possuem propriedades antifúngicas, prevenindo doenças em culturas.</li>
                    <li><b>Plantas Promotoras de Crescimento:</b> Algas marinhas e outros extratos vegetais que estimulam o desenvolvimento radicular, a absorção de nutrientes e a produtividade.</li>
                    <li><b>Plantas Alelopáticas:</b> Aquelas que liberam substâncias capazes de inibir o crescimento de plantas daninhas vizinhas, contribuindo para o controle natural de invasoras.</li>
                </ul>
            </q-expansion-item>
            <q-expansion-item
                switch-toggle-side
                label="Usos na Agricultura"
                header-class="text-primary"
                class="Infosplantas_expand"
            >
                <ul class="InfosPlantas_lista">
                    <li><b>Controle Natural de Pragas e Doenças:</b> Reduzem a dependência de produtos químicos sintéticos, tornando a produção mais sustentável e segura.</li>
                    <li><b>Estimulação do Crescimento e Produtividade:</b> Ajudam as culturas a crescerem mais fortes e produzirem mais, aumentando a rentabilidade do produtor.</li>
                    <li><b>Melhora da Saúde e Estrutura do Solo:</b> Contribuem para um solo mais fértil e equilibrado, favorecendo a microbiota benéfica.</li>
                    <li><b>Redução do Estresse Hídrico e Nutricional:</b> Fortalecem as plantas para resistir a condições climáticas adversas e deficiências de nutrientes.</li>
                </ul>
            </q-expansion-item>
            <q-expansion-item
                switch-toggle-side
                label="Benefícios para o Produtor Rural"
                header-class="text-primary"
                class="Infosplantas_expand"
            >
                <ul class="InfosPlantas_lista">
                    <li><b>Sustentabilidade:</b> Promovem práticas agrícolas mais ecológicas e em harmonia com o meio ambiente.</li>
                    <li><b>Economia:</b> Diminuem custos com agroquímicos, otimizando o uso de recursos.</li>
                    <li><b>Qualidade do Produto:</b> Resultam em alimentos mais saudáveis e valorizados no mercado.</li>
                    <li><b>Resistência de Culturas:</b> Aumentam a capacidade das plantas de se defenderem de ameaças.</li>
                    <li><b>Certificação Orgânica:</b> Facilitam a obtenção de selos de produção orgânica e sustentável.</li>
                </ul>
            </q-expansion-item>
            <q-expansion-item
                switch-toggle-side
                label="Derivados e Aplicações"
                header-class="text-primary"
                class="Infosplantas_expand"
            >
                <div>
                    <p class="InfosPlantas_p">Os compostos bioativos das plantas podem ser extraídos e formulados em diversos produtos, como:</p>
                    <ul class="InfosPlantas_lista" style="padding-top: 0;">
                        <li><b>Extratos Vegetais:</b> Utilizados como biofertilizantes ou biopesticidas.</li>
                        <li><b>Óleos Essenciais:</b> Empregados no controle de pragas ou como estimulantes vegetais.</li>
                        <li><b>Adubos Verdes:</b> Plantas cultivadas e incorporadas ao solo para melhorar sua fertilidade.</li>
                        <li><b>Cobertura de Solo:</b> Mantêm a umidade, controlam ervas daninhas e enriquecem o solo.</li>
                    </ul>
                    <p class="InfosPlantas_p">Esses derivados são aplicados por pulverização foliar, tratamento de sementes ou incorporação direta ao solo, oferecendo flexibilidade ao produtor.</p>
                </div>
            </q-expansion-item>
            <q-expansion-item
                switch-toggle-side
                label="Considerações de Segurança e Boas Práticas"
                header-class="text-primary"
                class="Infosplantas_expand"
            >
                <ul class="InfosPlantas_lista">
                    <li><b>Dosagem Correta:</b> Siga sempre as recomendações de uso para evitar efeitos indesejados.</li>
                    <li><b>Armazenamento:</b> Guarde os produtos em locais adequados, protegidos da luz e umidade.</li>
                    <li><b>Compatibilidade:</b> Verifique se os produtos bioativos são compatíveis com outras práticas ou insumos utilizados na lavoura.</li>
                    <li><b>Consulta Técnica:</b> Em caso de dúvidas, procure sempre um agrônomo ou especialista.</li>
                    <li><b>Teste em Pequena Escala:</b> Antes de aplicar em toda a cultura, faça um teste em uma pequena área para observar a reação das plantas.</li>
                </ul>
            </q-expansion-item>
        </div>

    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InfosPlantas'
})
</script>

<style scoped>

.InfosPlantas {
    padding: 4rem;
    background-color: var(--color-gray-light);
}

.InfosPlantas h1 {
    font-size: 28px;
    font-weight: bold;
    text-align: center;
}

.InfosPlantas_text {
    max-width: var(--limit-page-width);
    margin: auto;
}

.InfosPlantas_text h2 {
    font-size: 18px;
    font-weight: 600;
}
.InfosPlantas_text p {
    font-size: 14px;
}

.InfosPlantas_lista {
    padding: 12px 0px 0px 30px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.Infosplantas_expand {
    font-size: 14px;
}
.InfosPlantas_p {
    margin: 12px 0;
    font-size: 14px;
}
@media screen and (max-width: 680px) {
    .InfosPlantas {
        padding: 2rem;
    }
    .InfosPlantas h1 {
        font-size: 22px;
    }
    .InfosPlantas_text p, .Infosplantas_expand, .InfosPlantas_p {
        font-size: 12px;
    }
}
</style>
