##REQUISITOS FUNCIONAIS: 

RF01 - Gestão de Autenticação e Perfis

[X] Deve ser possível cadastrar um usuário (cliente).

[ ] Deve ser possível realizar login e logout.

[ ] Deve ser possível recuperar a senha (ex: por e-mail).

[X] O cliente deve poder editar suas próprias informações de perfil (nome, telefone).



RF02 - Gestão de Profissionais (Funcionários)

[X] Deve ser possível cadastrar profissionais.

[X] Deve ser possível editar e inativar profissionais.

[X] Deve ser possível excluir profissioanais.


RF03 - Gestão de Serviços

[X] Deve ser possível cadastrar os serviços oferecidos (ex: "Corte Masculino", "Barba", "Sobrancelha").

[X] Cada serviço deve ter um nome, descrição e preço.

[X] Deve ser possível editar e deletar serviços.

[X] Deve ser possível ver os serviços.

RF04 - Gestão de Produtos e Vendas

[X] Deve ser possível cadastrar produtos (com nome, preço, descrição e quantidade em estoque).

[X] Deve ser possível editar produtos.

[X] Deve ser possível deletar produtos.

[] O cliente deve poder visualizar um carrinho de produtos.

[ ] O cliente deve poder adicionar e remover produtos do carrinho.

[ ] Deve ser possível finalizar a compra dos produtos do carrinho (checkout).

RF05 - Gestão de Agendamentos

[] Deve ser possível marcar um corte (agora chamado de "agendar um serviço").

O cliente escolhe o serviço, o profissional, a data e o horário disponível.

[] Deve ser possível cancelar um agendamento.

[] O cliente deve poder visualizar seu histórico de agendamentos.

[ ] O profissional deve poder visualizar seu próprio histórico de atendimentos.

[ ] - Um barbeiro deve poder visualizar sua agenda

RF06 - Visualização da Agenda

[] -  Deve ser possível visualizar a agenda dos funcionários.

[] - O profissional visualiza sua própria agenda (diária, semanal, mensal).

[] - Um administrador pode visualizar a agenda de todos os profissionais.

RF07 - Painel Administrativo

[ ] Deve existir um painel para o administrador gerenciar todos os cadastros (profissionais, serviços, produtos).

[ ] O administrador deve ter acesso a relatórios simples (ex: faturamento por período, agendamentos por profissional).


##REQUISITOS NÃO FUNCIONAIS:

[] - Um novo agendamento só pode ser marcado se o profissional estiver dentro de sua jornada de trabalho e não possuir outro agendamento que se sobreponha (considerando a duração do serviço selecionado).

[] - Não é possível realizar agendamentos em datas ou horários passados.

[] - O cliente só pode cancelar um agendamento com uma antecedência mínima de X horas (ex: 2 horas). Passado esse prazo, o cancelamento deve ser feito por outro meio (ex: telefone).

[] - A lista de horários disponíveis para um profissional em um determinado dia deve ser calculada dinamicamente, baseando-se em sua jornada de trabalho e nos agendamentos já existentes.

[] - Um profissional marcado como "inativo" não pode ser selecionado para novos agendamentos.

[] - Um produto com estoque igual a zero não pode ser adicionado ao carrinho ou vendido.

[] - Após a finalização de uma compra, o estoque dos produtos vendidos deve ser atualizado (subtraído) automaticamente.

[] - O e-mail utilizado no cadastro de um usuário (cliente ou profissional) deve ser único no sistema.

[] - A senha do usuário deve ter requisitos mínimos de segurança (ex: mínimo de 6 caracteres).

[] - Usuários do tipo "cliente" não podem acessar o painel administrativo ou a agenda completa de outros profissionais. Apenas suas próprias informações e agendamentos.

[] - Usuário deve ser autenticado via JWT