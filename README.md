# Trabalho - Engenharia de Software: Arquitetura Serverless

- [Trabalho - Engenharia de Software: Arquitetura Serverless](#trabalho---engenharia-de-software-arquitetura-serverless)
  - [Integrantes do Grupo](#integrantes-do-grupo)
  - [Criação da Função Lambda AWS](#criação-da-função-lambda-aws)
    - [1. Criar uma Conta na AWS e Configurar um IAM Role](#1-criar-uma-conta-na-aws-e-configurar-um-iam-role)
      - [1.1 Criar uma Conta AWS](#11-criar-uma-conta-aws)
      - [1.2 Configurar um IAM Role](#12-configurar-um-iam-role)
      - [1.3 (Opcional) Criar um Bucket S3 para o Exemplo](#13-opcional-criar-um-bucket-s3-para-o-exemplo)
    - [2. Escrever o Código da Função](#2-escrever-o-código-da-função)
      - [2.1 Criar o Arquivo de Código](#21-criar-o-arquivo-de-código)
    - [3. Criar a Função no Console da AWS](#3-criar-a-função-no-console-da-aws)
      - [3.1 Acessar o Console da AWS](#31-acessar-o-console-da-aws)
      - [3.2 Criar a Função Lambda](#32-criar-a-função-lambda)
      - [3.3 Adicionar o Código](#33-adicionar-o-código)
      - [3.4 Adicione o gatilho para o ser o Evento](#34-adicione-o-gatilho-para-o-ser-o-evento)
    - [Testar a Função Lambda](#testar-a-função-lambda)
      - [4.1 Configurar e Executar o Teste](#41-configurar-e-executar-o-teste)
  - [Beneficios da Arquitetura Serveless](#beneficios-da-arquitetura-serveless)
    - [1. Escalabilidade Automática](#1-escalabilidade-automática)
    - [2. Custo-eficiência](#2-custo-eficiência)
    - [3. Redução de Complexidade Operacional](#3-redução-de-complexidade-operacional)
    - [4. Desenvolvimento Rápido](#4-desenvolvimento-rápido)
    - [5. Alta Disponibilidade e Resiliência](#5-alta-disponibilidade-e-resiliência)
    - [6. Foco em Microserviços](#6-foco-em-microserviços)
    - [7. Facilidade de Integração com Outros Serviços](#7-facilidade-de-integração-com-outros-serviços)
    - [8. Redução do Risco de Over-Provisioning](#8-redução-do-risco-de-over-provisioning)
    - [9. Apoio ao Desenvolvimento de Aplicações Event-Driven](#9-apoio-ao-desenvolvimento-de-aplicações-event-driven)

## Integrantes do Grupo

- **Gabriel Torres Talim** - 20213010324
- **João Victor Sfredo de Castro** - 20213010450
- **Lara Santos Rosseti** - 20213010450
- **Paulo Renato Souza Magalhães** - 20213008620

## Criação da Função Lambda AWS

Este guia ensina como criar um projeto Serverless utilizando uma função AWS Lambda.

### 1. Criar uma Conta na AWS e Configurar um IAM Role

#### 1.1 Criar uma Conta AWS

Se você ainda não possui uma conta na AWS, acesse [AWS Free Tier](https://aws.amazon.com/pt/free/) e siga as instruções para criar uma nova conta. A conta gratuita da AWS oferece 12 meses de uso gratuito com diversos serviços, incluindo o Lambda.

#### 1.2 Configurar um IAM Role

1. Acesse o serviço IAM no console da AWS.
2. Clique em **Roles** no menu à esquerda e, em seguida, em **Create role**.
3. Escolha **AWS service** como o tipo de entidade confiável.
4. Selecione **Lambda** como o serviço que usará este role.
5. Clique em **Next: Permissions** e selecione as permissões necessárias, como `AWSLambdaBasicExecutionRole` (essa política permite que sua função Lambda escreva logs no Amazon CloudWatch).
6. Clique em **Next: Tags** (opcional) e, depois, em **Next: Review**.
7. Nomeie o role (por exemplo, `lambda-basic-role`) e clique em **Create role**.

#### 1.3 (Opcional) Criar um Bucket S3 para o Exemplo

![image](https://github.com/user-attachments/assets/48740af6-6c64-4f57-aa79-0bfef3b38d0b)

> Você pode criar um Bucket S3 para armazenar dados e arquivos que serão utilizados ou processados pela função Lambda.

### 2. Escrever o Código da Função

![image](https://github.com/user-attachments/assets/ce8b2600-de75-47ec-9fa3-124d7b3c0de7)
![image](https://github.com/user-attachments/assets/e85d2a17-3896-4958-8c08-91b358561c88)

Vamos usar Python para este exemplo. Siga os passos abaixo:

#### 2.1 Criar o Arquivo de Código

Este código Python é uma função Lambda projetada para ser acionada por eventos do Amazon S3. A função redimensiona uma imagem que foi carregada em um bucket S3 para 128x128 pixels e, em seguida, faz o upload da imagem redimensionada em um novo bucket ou diretório no S3.

``` python
import boto3
import os
import sys
import uuid
from PIL import Image
import PIL.Image

s3_client = boto3.client('s3')

def resize_image(image_path, resized_path):
    with Image.open(image_path) as image:
        image.thumbnail((128, 128))
        image.save(resized_path)

def handler(event, context):
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        download_path = '/tmp/{}{}'.format(uuid.uuid4(), key)
        upload_path = '/tmp/resized-{}'.format(key)

        s3_client.download_file(bucket, key, download_path)
        resize_image(download_path, upload_path)
        s3_client.upload_file(upload_path, '{}-resized'.format(bucket), key)
```

### 3. Criar a Função no Console da AWS

#### 3.1 Acessar o Console da AWS

Acesse o console da AWS.

No menu de serviços, procure por Lambda e clique para acessar.

#### 3.2 Criar a Função Lambda

Clique em Create function.

Escolha a opção Author from scratch.

#### 3.3 Adicionar o Código

Na seção Function code, você verá um editor onde pode colar o código Python que você criou no function.py.

Substitua qualquer código de exemplo com o código fornecido acima.

Clique em Deploy para salvar as alterações.

#### 3.4 Adicione o gatilho para o ser o Evento
![image](https://github.com/user-attachments/assets/9d4f356a-bd84-4a2e-a94c-4c43d158ed36)

![image](https://github.com/user-attachments/assets/e60b1995-6a81-438a-809b-c6c29bbcb846)

### Testar a Função Lambda
![image](https://github.com/user-attachments/assets/1076beca-c98e-49f7-a9b3-52fd2434db70)

#### 4.1 Configurar e Executar o Teste

Clique em Test no console da função Lambda.

Em Test event, selecione Configure test event.

Escolha Create new test event, nomeie o evento (por exemplo, test-event):

![image](https://github.com/user-attachments/assets/dbf42ead-1022-4895-814d-7218cbd5639a)

e coloque o seguinte codigo Json na pasta.


![image](https://github.com/user-attachments/assets/3b449d9e-7fdd-4297-aef8-39cd463d2d57)

![image](https://github.com/user-attachments/assets/79435d0d-d206-424e-923b-04de3d061774)

Clique em Create e, em seguida, em Test.

Este é o resultado esperado, onde a imagem sera alterada para 128x128 pixels.

## Beneficios da Arquitetura Serveless

### 1. Escalabilidade Automática
**Escalabilidade sob demanda:** Em uma arquitetura serverless, as funções são escaladas automaticamente conforme a demanda. Se sua aplicação tiver picos de tráfego, o provedor de nuvem ajustará automaticamente o número de instâncias necessárias para lidar com o aumento de carga, sem a necessidade de intervenção manual.'

### 2. Custo-eficiência
**Pagamento por uso:** Com a arquitetura serverless, você só paga pelo tempo de execução da função. Isso significa que se não houver solicitações, não haverá custo. Esse modelo "pay-as-you-go" é mais econômico em comparação com a manutenção de servidores em execução constante.

### 3. Redução de Complexidade Operacional
**Sem gerenciamento de servidores:** O provedor de nuvem gerencia toda a infraestrutura subjacente, incluindo servidores, escalabilidade, balanceamento de carga e patches de segurança. Isso permite que os desenvolvedores se concentrem em escrever código e implementar funcionalidades, sem se preocupar com a manutenção de servidores.

### 4. Desenvolvimento Rápido
**Tempo de lançamento acelerado:** A arquitetura serverless permite que os desenvolvedores construam e implantem funções de maneira rápida. Isso acelera o ciclo de desenvolvimento e facilita a implementação de novas funcionalidades ou a realização de experimentos com diferentes soluções.

### 5. Alta Disponibilidade e Resiliência
**Alta disponibilidade integrada:** A infraestrutura serverless geralmente é projetada para ser altamente disponível e resiliente a falhas, com replicação automática em várias zonas de disponibilidade. Isso garante que as aplicações serverless estejam sempre disponíveis para os usuários.

### 6. Foco em Microserviços
**Desenvolvimento modular:** A arquitetura serverless se encaixa bem com a filosofia de microserviços, onde aplicações são compostas de pequenas funções independentes que executam tarefas específicas. Isso facilita a manutenção, a atualização e a escalabilidade de partes individuais do sistema.

### 7. Facilidade de Integração com Outros Serviços
**Integração nativa:** Provedores de nuvem como AWS, Google Cloud e Azure oferecem integrações nativas com outros serviços (por exemplo, banco de dados, autenticação, filas de mensagens), simplificando a criação de soluções complexas sem a necessidade de configuração manual extensiva.

### 8. Redução do Risco de Over-Provisioning
**Alocação de recursos sob demanda:** Como os recursos são alocados dinamicamente com base na demanda, não há necessidade de provisionar recursos em excesso para picos de carga esporádicos, o que é comum em arquiteturas tradicionais.

### 9. Apoio ao Desenvolvimento de Aplicações Event-Driven
**Reatividade a eventos:** Serverless é particularmente adequado para arquiteturas baseadas em eventos, onde funções são acionadas automaticamente em resposta a eventos como uploads de arquivos, mensagens em filas ou alterações em bancos de dados.
