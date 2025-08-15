<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Instruções do Copilot para o Projeto Purcell

Este é um projeto de site moderno para uma refinaria de ouro chamada Purcell, desenvolvido para ser hospedado no GitHub Pages.

## Contexto do Projeto

- **Tipo**: Site institucional/landing page
- **Cliente**: Purcell Refinaria de Ouro
- **Objetivo**: Apresentar a empresa de forma profissional e moderna
- **Público-alvo**: Investidores, colecionadores e clientes corporativos

## Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Framework CSS**: Tailwind CSS
- **Biblioteca de Animações**: AOS (Animate On Scroll)
- **Fontes**: Google Fonts (Inter + Playfair Display)
- **Hospedagem**: GitHub Pages

## Padrões de Código

### HTML
- Usar estrutura semântica (header, main, section, footer)
- IDs únicos para navegação
- Classes Tailwind para styling
- Acessibilidade (alt texts, ARIA labels quando necessário)

### CSS
- Usar variáveis CSS para cores principais
- Prefixar animações personalizadas
- Manter consistência com o tema dourado
- Design responsivo mobile-first

### JavaScript
- ES6+ features (const/let, arrow functions, template literals)
- Event listeners otimizados
- Funcões modulares e reutilizáveis
- Comentários explicativos para funções complexas

## Paleta de Cores

```css
:root {
    --gold-primary: #fbbf24;
    --gold-secondary: #f59e0b;
    --gold-dark: #d97706;
    --gray-900: #111827;
    --gray-800: #1f2937;
    --gray-700: #374151;
}
```

## Diretrizes de Design

### Visual
- Tema elegante com predominância de tons escuros e dourados
- Gradientes suaves para elementos de destaque
- Espaçamento generoso e tipografia hierárquica
- Efeitos visuais sutis mas impactantes

### UX/UI
- Navegação intuitiva e suave
- Call-to-actions claros e visíveis
- Feedback visual para interações
- Carregamento rápido e performance otimizada

### Animações
- Entrance animations com AOS
- Hover effects em cartões e botões
- Transições suaves (0.3s cubic-bezier)
- Sistema de partículas para efeitos especiais

## Seções do Site

1. **Navigation**: Menu fixo com logo e links
2. **Hero**: Apresentação principal com CTA
3. **About**: História e estatísticas da empresa
4. **Services**: 6 serviços principais em grid
5. **Process**: Timeline do processo de refinamento
6. **Contact**: Formulário e informações de contato
7. **Footer**: Links e informações corporativas

## Boas Práticas

### Performance
- Minificar CSS/JS quando possível
- Otimizar imagens (WebP quando suportado)
- Lazy loading para elementos não críticos
- Preload de recursos importantes

### SEO
- Meta tags apropriadas
- Estrutura semântica
- URLs amigáveis (single page, mas com navegação por âncoras)
- Schema markup para dados da empresa

### Acessibilidade
- Contraste adequado (WCAG AA)
- Navegação por teclado
- Screen reader compatibility
- Focus indicators visíveis

## Funcionalidades Especiais

### Contadores Animados
- Animam quando entram na viewport
- Formatação adequada (números, porcentagens)
- Duração suave (2 segundos)

### Sistema de Partículas
- Partículas flutuantes no background
- Partículas douradas no hover dos cartões
- Performance otimizada com cleanup

### Formulário de Contato
- Validação frontend
- Feedback visual de envio
- Estado de loading
- Notificações de sucesso/erro

## Responsividade

### Breakpoints
- Mobile: 640px e abaixo
- Tablet: 641px - 1024px
- Desktop: 1025px e acima

### Adaptações Mobile
- Menu hamburger
- Timeline vertical
- Cartões em coluna única
- Texto e imagens redimensionados

Ao trabalhar neste projeto, mantenha sempre o foco na elegância, performance e experiência do usuário, refletindo a qualidade premium dos serviços da Purcell.
