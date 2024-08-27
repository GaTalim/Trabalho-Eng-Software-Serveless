# Trabalho-Eng-Software-Serveless
Gabriel Torres Talim - 20213010324

# Criação da Função Lambda AWS
Ensina a criar um projeto Serveless de função Lambda AWS

1. Criar uma Conta na AWS e Configurar um IAM Role
1.1 Criar uma Conta AWS
Se você ainda não possui uma conta na AWS, acesse [AWS Free Tier](https://aws.amazon.com/pt/free/) e siga as instruções para criar uma nova conta. A conta gratuita da AWS oferece 12 meses de uso gratuito com diversos serviços, incluindo o Lambda.
1.2 Configurar um IAM Role
Após criar a conta e fazer login, acesse o serviço IAM no console da AWS.
Clique em Roles no menu à esquerda e, em seguida, em Create role.
Escolha o tipo de entidade confiável: AWS service.
Selecione Lambda como o serviço que usará este role.
Clique em Next: Permissions e selecione as permissões necessárias, como AWSLambdaBasicExecutionRole (essa política permite que sua função Lambda escreva logs no Amazon CloudWatch).
Clique em Next: Tags (opcional) e, depois, em Next: Review.
Nomeie o role (por exemplo, lambda-basic-role) e clique em Create role.
2. Escrever o Código da Função
Vamos usar Node.js para este exemplo. Siga os passos abaixo:

2.1 Criar o Arquivo de Código
No seu ambiente de desenvolvimento local, crie um arquivo chamado index.js com o código que esta no arquivo.
Este código define uma função Lambda simples que recebe um evento contendo um nome e retorna uma saudação personalizada.

3. Criar a Função no Console da AWS
3.1 Acessar o Console da AWS
Acesse o console da AWS.
No menu de serviços, procure por Lambda e clique para acessar.
3.2 Criar a Função Lambda
Clique em Create function.
Escolha a opção Author from scratch.
Preencha os seguintes detalhes:
Function name: Por exemplo, hello-world.
Runtime: Selecione a versão mais recente do Node.js (por exemplo, Node.js 18.x).
Permissions: Em Change default execution role, selecione Use an existing role e escolha o role lambda-basic-role criado anteriormente.
3.3 Adicionar o Código
Na seção Function code, você verá um editor onde pode colar o código JavaScript que você criou no index.js.
Substitua qualquer código de exemplo com o código fornecido acima.
Clique em Deploy para salvar as alterações.


4. Testar a Função Lambda
4.1 Configurar e Executar o Teste
Clique em Test no console da função Lambda.
Em Test event, selecione Configure test event.
Escolha Create new test event, nomeie o evento (por exemplo, test-event), e cole o seguinte JSON:

{
    "name": "SeuNome"
}

Substitua "SeuNome" pelo nome que você deseja usar no teste.

Clique em Create e, em seguida, em Test.
4.2 Verificar o Resultado
Se tudo estiver configurado corretamente, você verá a seguinte saída no console:

{
    "statusCode": 200,
    "body": "Hello, SeuNome!"
}

Este é o resultado esperado, onde SeuNome é o nome passado no evento de teste.


# Beneficios da Arquitetura Serveless

1. Escalabilidade Automática
Escalabilidade sob demanda: Em uma arquitetura serverless, as funções são escaladas automaticamente conforme a demanda. Se sua aplicação tiver picos de tráfego, o provedor de nuvem ajustará automaticamente o número de instâncias necessárias para lidar com o aumento de carga, sem a necessidade de intervenção manual.'

2. Custo-eficiência
Pagamento por uso: Com a arquitetura serverless, você só paga pelo tempo de execução da função. Isso significa que se não houver solicitações, não haverá custo. Esse modelo "pay-as-you-go" é mais econômico em comparação com a manutenção de servidores em execução constante.

3. Redução de Complexidade Operacional
Sem gerenciamento de servidores: O provedor de nuvem gerencia toda a infraestrutura subjacente, incluindo servidores, escalabilidade, balanceamento de carga e patches de segurança. Isso permite que os desenvolvedores se concentrem em escrever código e implementar funcionalidades, sem se preocupar com a manutenção de servidores.

4. Desenvolvimento Rápido
Tempo de lançamento acelerado: A arquitetura serverless permite que os desenvolvedores construam e implantem funções de maneira rápida. Isso acelera o ciclo de desenvolvimento e facilita a implementação de novas funcionalidades ou a realização de experimentos com diferentes soluções.

5. Alta Disponibilidade e Resiliência
Alta disponibilidade integrada: A infraestrutura serverless geralmente é projetada para ser altamente disponível e resiliente a falhas, com replicação automática em várias zonas de disponibilidade. Isso garante que as aplicações serverless estejam sempre disponíveis para os usuários.

6. Foco em Microserviços
Desenvolvimento modular: A arquitetura serverless se encaixa bem com a filosofia de microserviços, onde aplicações são compostas de pequenas funções independentes que executam tarefas específicas. Isso facilita a manutenção, a atualização e a escalabilidade de partes individuais do sistema.

7. Facilidade de Integração com Outros Serviços
Integração nativa: Provedores de nuvem como AWS, Google Cloud e Azure oferecem integrações nativas com outros serviços (por exemplo, banco de dados, autenticação, filas de mensagens), simplificando a criação de soluções complexas sem a necessidade de configuração manual extensiva.

8. Redução do Risco de Over-Provisioning
Alocação de recursos sob demanda: Como os recursos são alocados dinamicamente com base na demanda, não há necessidade de provisionar recursos em excesso para picos de carga esporádicos, o que é comum em arquiteturas tradicionais.

9. Apoio ao Desenvolvimento de Aplicações Event-Driven
Reatividade a eventos: Serverless é particularmente adequado para arquiteturas baseadas em eventos, onde funções são acionadas automaticamente em resposta a eventos como uploads de arquivos, mensagens em filas ou alterações em bancos de dados.
