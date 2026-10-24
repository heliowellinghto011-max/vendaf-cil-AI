import { BrowserRouter, Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { hasSupabaseConfig, supabaseSetupNote } from './lib/supabase';

const STORAGE_KEYS = {
  auth: 'vendafacil_auth_session',
  users: 'vendafacil_users',
  opportunities: 'vendafacil_opportunities'
};

const stageOptions = [
  { value: 'novo-contato', label: 'Novo contato' },
  { value: 'em-negociacao', label: 'Em negociação' },
  { value: 'aguardando-resposta', label: 'Aguardando resposta' },
  { value: 'venda-concluida', label: 'Venda concluída' },
  { value: 'perdida', label: 'Perdida' }
];

const channelOptions = ['WhatsApp', 'Instagram', 'Telefone', 'Site', 'Indicação'];

const objectiveOptions = {
  'primeiro-contato': 'Primeiro contato',
  acompanhamento: 'Acompanhamento',
  'resposta-duvidas': 'Resposta a dúvidas',
  'retomada-negociacao': 'Retomada de negociação'
};

const demoUsers = [
  {
    id: 'user-demo-1',
    name: 'Ana Martins',
    email: 'demo@vendafacil.ai',
    password: 'demo123',
    company: {
      id: 'company-demo-1',
      name: 'Loja Demo Central',
      segment: 'Loja de móveis e decoração'
    }
  },
  {
    id: 'user-demo-2',
    name: 'Carlos Ribeiro',
    email: 'comerciante@vendafacil.ai',
    password: 'demo123',
    company: {
      id: 'company-demo-2',
      name: 'Casa & Estilo',
      segment: 'Vitrine de eletrônicos e acessórios'
    }
  }
];

const demoOpportunityCatalog = {
  'company-demo-1': [
    {
      id: 'OP-101',
      clientName: 'Maria Souza',
      product: 'Cadeira ergonômica para escritório',
      value: 1850,
      channel: 'Instagram',
      lastContact: '2026-10-18',
      stage: 'aguardando-resposta',
      notes: 'Cliente demonstrou interesse após anúncio e solicitou orçamento detalhado.',
      lossReason: '',
      createdAt: '2026-10-10',
      companyId: 'company-demo-1'
    },
    {
      id: 'OP-102',
      clientName: 'João Almeida',
      product: 'Kit de café para pequenas empresas',
      value: 540,
      channel: 'WhatsApp',
      lastContact: '2026-10-20',
      stage: 'em-negociacao',
      notes: 'Interessado em iniciar compra em duas parcelas e pediu análise de frete.',
      lossReason: '',
      createdAt: '2026-10-12',
      companyId: 'company-demo-1'
    },
    {
      id: 'OP-103',
      clientName: 'Lúcia Vieira',
      product: 'Conjunto de luminárias para salão',
      value: 2980,
      channel: 'Telefone',
      lastContact: '2026-10-17',
      stage: 'novo-contato',
      notes: 'Solicitou informações sobre entrega e condições de pagamento.',
      lossReason: '',
      createdAt: '2026-10-14',
      companyId: 'company-demo-1'
    },
    {
      id: 'OP-104',
      clientName: 'Carlos Mendes',
      product: 'Mesa de reunião com 6 cadeiras',
      value: 4290,
      channel: 'Site',
      lastContact: '2026-10-09',
      stage: 'venda-concluida',
      notes: 'Pedido fechado após visita virtual e confirmação do orçamento.',
      lossReason: '',
      createdAt: '2026-10-06',
      companyId: 'company-demo-1'
    },
    {
      id: 'OP-105',
      clientName: 'Renata Costa',
      product: 'Pendente industrial para loja',
      value: 890,
      channel: 'Indicação',
      lastContact: '2026-10-04',
      stage: 'perdida',
      notes: 'Cliente optou por fornecedor mais próximo.',
      lossReason: 'Concorrência com preço menor',
      createdAt: '2026-09-29',
      companyId: 'company-demo-1'
    }
  ],
  'company-demo-2': [
    {
      id: 'OP-201',
      clientName: 'Paulo Nunes',
      product: 'Smart TV 55 polegadas',
      value: 2280,
      channel: 'WhatsApp',
      lastContact: '2026-10-22',
      stage: 'em-negociacao',
      notes: 'Solicitou parcelamento em 12 vezes e comparou com oferta concorrente.',
      lossReason: '',
      createdAt: '2026-10-09',
      companyId: 'company-demo-2'
    },
    {
      id: 'OP-202',
      clientName: 'Fernanda Lima',
      product: 'Kit de áudio Bluetooth',
      value: 760,
      channel: 'Instagram',
      lastContact: '2026-10-15',
      stage: 'aguardando-resposta',
      notes: 'Pedimos envio de fotos e comparação de modelos.',
      lossReason: '',
      createdAt: '2026-10-11',
      companyId: 'company-demo-2'
    },
    {
      id: 'OP-203',
      clientName: 'Rafael Torres',
      product: 'Câmera de segurança residencial',
      value: 1340,
      channel: 'Telefone',
      lastContact: '2026-10-08',
      stage: 'venda-concluida',
      notes: 'Venda finalizada após visita técnica e confirmação do diagnóstico.',
      lossReason: '',
      createdAt: '2026-10-03',
      companyId: 'company-demo-2'
    },
    {
      id: 'OP-204',
      clientName: 'Bia Santos',
      product: 'Ventilador de teto premium',
      value: 612,
      channel: 'Site',
      lastContact: '2026-10-01',
      stage: 'novo-contato',
      notes: 'Cliente entrou em contato pela página e pediu ajuda para escolher o modelo.',
      lossReason: '',
      createdAt: '2026-09-26',
      companyId: 'company-demo-2'
    },
    {
      id: 'OP-205',
      clientName: 'Thiago Dias',
      product: 'Caixa de som portátil',
      value: 430,
      channel: 'Indicação',
      lastContact: '2026-09-28',
      stage: 'perdida',
      notes: 'Cliente preferiu adiar a compra por limitações de orçamento.',
      lossReason: 'Orçamento no momento',
      createdAt: '2026-09-21',
      companyId: 'company-demo-2'
    }
  ]
};

const readStorage = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    return fallback;
  }
};

const writeStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(Number(value || 0));

const createEmptyOpportunity = () => ({
  id: '',
  clientName: '',
  product: '',
  value: 0,
  channel: 'WhatsApp',
  lastContact: new Date().toISOString().slice(0, 10),
  stage: 'novo-contato',
  notes: '',
  lossReason: '',
  companyId: ''
});

const getDaysSince = (dateString) => {
  const reference = new Date(dateString);
  const today = new Date();
  return Math.max(0, Math.ceil((today.getTime() - reference.getTime()) / (1000 * 60 * 60 * 24)));
};

const readUsers = () => {
  const saved = readStorage(STORAGE_KEYS.users, []);
  if (saved.length > 0) return saved;

  const seededUsers = demoUsers;
  writeStorage(STORAGE_KEYS.users, seededUsers);
  return seededUsers;
};

const readAuthState = () => readStorage(STORAGE_KEYS.auth, null);

const persistAuthState = (authState) => {
  if (!authState) {
    localStorage.removeItem(STORAGE_KEYS.auth);
    return;
  }

  writeStorage(STORAGE_KEYS.auth, authState);
};

const readOpportunitiesForCompany = (companyId) => {
  if (!companyId) return [];

  const storage = readStorage(STORAGE_KEYS.opportunities, {});
  if (storage[companyId] && storage[companyId].length) {
    return storage[companyId];
  }

  const seeded = demoOpportunityCatalog[companyId] || [];
  storage[companyId] = seeded;
  writeStorage(STORAGE_KEYS.opportunities, storage);
  return seeded;
};

const saveOpportunitiesForCompany = (companyId, opportunities) => {
  const storage = readStorage(STORAGE_KEYS.opportunities, {});
  storage[companyId] = opportunities;
  writeStorage(STORAGE_KEYS.opportunities, storage);
};

const nextOpportunityId = (opportunities, companyId) => {
  const ids = opportunities
    .map((item) => Number(String(item.id).replace(/\D/g, '')))
    .filter((item) => !Number.isNaN(item));

  const nextNumber = ids.length > 0 ? Math.max(...ids) + 1 : 101;
  const prefix = companyId === 'company-demo-2' ? 'OP-2' : 'OP-1';
  return `${prefix}${nextNumber}`;
};

const getPriority = (opportunity) => {
  let score = 0;

  const daysWithoutAnswer = getDaysSince(opportunity.lastContact);
  if (daysWithoutAnswer >= 7) score += 35;
  if (daysWithoutAnswer >= 14) score += 15;

  const lowerStage = opportunity.stage;
  if (lowerStage === 'novo-contato') score += 20;
  if (lowerStage === 'aguardando-resposta') score += 30;
  if (lowerStage === 'em-negociacao') score += 25;
  if (lowerStage === 'venda-concluida') score -= 100;
  if (lowerStage === 'perdida') score -= 100;

  if (Number(opportunity.value) >= 2000) score += 20;
  if (Number(opportunity.value) >= 5000) score += 10;

  const notes = String(opportunity.notes || '').toLowerCase();
  if (notes.includes('solicitou') || notes.includes('interessado') || notes.includes('orçamento') || notes.includes('ajuda')) {
    score += 18;
  }

  if (score >= 70) return { level: 'Alta', badge: 'high', score };
  if (score >= 40) return { level: 'Média', badge: 'medium', score };
  return { level: 'Baixa', badge: 'low', score };
};

const buildPriorityReason = (opportunity) => {
  const notes = String(opportunity.notes || '').toLowerCase();
  const stage = opportunity.stage;
  const days = getDaysSince(opportunity.lastContact);

  if (notes.includes('solicitou') && stage === 'aguardando-resposta') {
    return `Alta prioridade: cliente solicitou informações sobre o produto e ainda aguarda retorno.`;
  }

  if (stage === 'em-negociacao') {
    return `Média prioridade: a conversa está em negociação e o cliente ainda precisa de uma confirmação.`;
  }

  if (days >= 7) {
    return `Alta prioridade: já se passaram ${days} dias desde o último atendimento sem resposta.`;
  }

  if (Number(opportunity.value) >= 2000) {
    return `Média prioridade: valor estimado alto e pedido ainda em análise.`;
  }

  return `Baixa prioridade: oportunidade com menor urgência e valor moderado no momento.`;
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const [authState, setAuthState] = useState(() => readAuthState());
  const [users, setUsers] = useState(() => readUsers());
  const [opportunities, setOpportunities] = useState(() =>
    readOpportunitiesForCompany(readAuthState()?.company?.id || '')
  );

  useEffect(() => {
    persistAuthState(authState);
  }, [authState]);

  useEffect(() => {
    setUsers(readUsers());
  }, []);

  useEffect(() => {
    const companyId = authState?.company?.id;
    if (companyId) {
      setOpportunities(readOpportunitiesForCompany(companyId));
    } else {
      setOpportunities([]);
    }
  }, [authState?.company?.id]);

  const companyId = authState?.company?.id || '';
  const refreshOpportunities = () => {
    if (companyId) {
      setOpportunities(readOpportunitiesForCompany(companyId));
    }
  };

  const handleSaveOpportunity = (opportunity) => {
    if (!companyId) return;
    const current = readOpportunitiesForCompany(companyId);
    const next = opportunity.id
      ? current.map((item) => (item.id === opportunity.id ? { ...opportunity, companyId } : item))
      : [{ ...opportunity, id: nextOpportunityId(current, companyId), companyId, createdAt: opportunity.createdAt || new Date().toISOString().slice(0, 10) }, ...current];

    saveOpportunitiesForCompany(companyId, next);
    setOpportunities(next);
  };

  const handleDeleteOpportunity = (id) => {
    if (!companyId) return;
    const current = readOpportunitiesForCompany(companyId).filter((item) => item.id !== id);
    saveOpportunitiesForCompany(companyId, current);
    setOpportunities(current);
  };

  const handleLogout = () => {
    setAuthState(null);
  };

  const authenticated = Boolean(authState?.company?.id);

  return (
    <Routes>
      <Route path="/" element={authenticated ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
      <Route
        path="/login"
        element={
          authenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage users={users} onLogin={setAuthState} />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          authenticated ? (
            <Layout onLogout={handleLogout}>
              <DashboardPage opportunities={opportunities} company={authState.company} />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/oportunidades"
        element={
          authenticated ? (
            <Layout onLogout={handleLogout}>
              <OpportunitiesPage
                opportunities={opportunities}
                company={authState.company}
                onSave={handleSaveOpportunity}
                onDelete={handleDeleteOpportunity}
                onRefresh={refreshOpportunities}
              />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/prioridades"
        element={
          authenticated ? (
            <Layout onLogout={handleLogout}>
              <PrioritiesPage opportunities={opportunities} />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/assistente"
        element={
          authenticated ? (
            <Layout onLogout={handleLogout}>
              <MessageAssistantPage opportunities={opportunities} />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/relatorios"
        element={
          authenticated ? (
            <Layout onLogout={handleLogout}>
              <ReportsPage opportunities={opportunities} />
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function LandingPage() {
  const [leadData, setLeadData] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleLeadSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="brand-wrap">
          <div className="brand-mark">V</div>
          <div>
            <strong>VendaFácil AI</strong>
            <small>Gestão comercial para pequenos negócios</small>
          </div>
        </div>
        <nav>
          <a href="#problema">Problema</a>
          <a href="#beneficios">Benefícios</a>
          <a href="#funcionalidades">Funções</a>
          <Link to="/login" className="button button-primary">Experimentar demonstração</Link>
        </nav>
      </header>

      <main className="landing-main">
        <section className="hero">
          <div className="hero-copy">
            <span className="status-tag">Demonstração · Dados fictícios</span>
            <h1>Organize oportunidades, aumente vendas e cuide do cliente antes que ele vá embora.</h1>
            <p>
              O VendaFácil AI ajuda pequenos comerciantes a acompanhar clientes interessados, identificar os mais urgentes e responder com mais rapidez.
            </p>
            <div className="cta-row">
              <Link to="/login" className="button button-primary large">Experimentar demonstração</Link>
              <a href="#interessados" className="button button-secondary large">Quero testar</a>
            </div>
          </div>
          <div className="hero-panel card panel-glow">
            <div className="panel-header">
              <span>Resumo do dia</span>
              <span className="mini-pill success">+18% em oportunidades</span>
            </div>
            <div className="value-row">
              <div>
                <small>Oportunidades</small>
                <strong>128</strong>
              </div>
              <div>
                <small>Taxa de conversão</small>
                <strong>32%</strong>
              </div>
            </div>
            <div className="mini-chart">
              {[35, 55, 30, 80, 70, 95, 110].map((value, index) => (
                <span key={index} style={{ height: `${value}%` }} />
              ))}
            </div>
            <div className="mini-list">
              <div><span className="dot green" /> Nova oportunidade</div>
              <div><span className="dot blue" /> Acompanhamento ativo</div>
              <div><span className="dot amber" /> Retomada de negociação</div>
            </div>
          </div>
        </section>

        <section id="problema" className="info-section">
          <div className="section-heading">
            <span className="eyebrow">Problema</span>
            <h2>Vendas perdidas por falta de organização.</h2>
          </div>
          <div className="feature-grid three-columns">
            <div className="feature-card">
              <h3>Clientes sem retorno</h3>
              <p>O contato cai na fila e o atendimento fica atrasado, porque o comércio não tem uma visão clara do que precisa ser priorizado.</p>
            </div>
            <div className="feature-card">
              <h3>Negociações dispersas</h3>
              <p>Mensagens, ligações e WhatsApp ficam espalhados. Isso reduz a velocidade de resposta e afeta a conversão.</p>
            </div>
            <div className="feature-card">
              <h3>Falta de visão</h3>
              <p>Sem relatórios e indicadores, o comerciante não sabe quais decisões aumentam as chances de venda no momento.</p>
            </div>
          </div>
        </section>

        <section id="beneficios" className="info-section alt-bg">
          <div className="section-heading">
            <span className="eyebrow">Benefícios</span>
            <h2>Menos retrabalho, mais oportunidades e tomada de decisão mais segura.</h2>
          </div>
          <div className="feature-grid four-columns">
            <div className="feature-card">
              <h3>Prioridade inteligente</h3>
              <p>Mostra quais oportunidades precisam de atenção primeiro sem inventar regras sofisticadas.</p>
            </div>
            <div className="feature-card">
              <h3>Mensagens mais rápidas</h3>
              <p>Crie textos para atendimento em segundos, com diferentes objetivos e contexto.</p>
            </div>
            <div className="feature-card">
              <h3>Relatórios claros</h3>
              <p>Analise evolução semanal com métricas calculadas a partir dos registros reais.</p>
            </div>
            <div className="feature-card">
              <h3>Uso simples</h3>
              <p>Funciona bem no celular, onde a maioria dos pequenos comerciantes acompanha as vendas.</p>
            </div>
          </div>
        </section>

        <section id="funcionalidades" className="info-section">
          <div className="section-heading">
            <span className="eyebrow">Funcionalidades</span>
            <h2>As quatro funções principais do MVP.</h2>
          </div>
          <div className="feature-grid four-columns">
            <div className="feature-card accent">
              <h3>1. Gestão de oportunidades</h3>
              <p>Cadastre clientes, valores, etapas e histórico para manter o funil organizado.</p>
            </div>
            <div className="feature-card accent">
              <h3>2. Priorização</h3>
              <p>Veja o que precisa de atenção primeiro com regras transparentes de urgência e valor.</p>
            </div>
            <div className="feature-card accent">
              <h3>3. Assistente de mensagens</h3>
              <p>Use modelos prontos para primeira abordagem, acompanhamento e retomada da venda.</p>
            </div>
            <div className="feature-card accent">
              <h3>4. Relatório semanal</h3>
              <p>Monitore oportunidades atendidas, vendas concluídas, perdas e taxa de conversão.</p>
            </div>
          </div>
        </section>

        <section id="interessados" className="info-section alt-bg">
          <div className="lead-card card">
            <div>
              <span className="eyebrow">Comerciante interessado?</span>
              <h3>Solicite uma demonstração do produto.</h3>
            </div>
            <form onSubmit={handleLeadSubmit} className="lead-form">
              <input
                type="text"
                value={leadData.name}
                onChange={(event) => setLeadData({ ...leadData, name: event.target.value })}
                placeholder="Seu nome"
              />
              <input
                type="email"
                value={leadData.email}
                onChange={(event) => setLeadData({ ...leadData, email: event.target.value })}
                placeholder="Seu e-mail"
              />
              <button type="submit" className="button button-primary">Solicitar teste</button>
            </form>
            {submitted && <p className="lead-success">Solicitação registrada em modo demonstração. Nenhuma integração externa foi simulada como ativa.</p>}
          </div>
        </section>
      </main>
    </div>
  );
}

function LoginPage({ users, onLogin }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'demo@vendafacil.ai', password: 'demo123' });
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const foundUser = users.find(
      (user) => user.email.toLowerCase() === form.email.toLowerCase() && user.password === form.password
    );

    if (!foundUser) {
      setError('E-mail ou senha inválidos. Use demo@vendafacil.ai / demo123.');
      return;
    }

    setError('');
    onLogin({ user: foundUser, company: foundUser.company });
    navigate('/dashboard');
  };

  return (
    <div className="auth-shell">
      <div className="auth-card card">
        <div className="auth-header">
          <div className="brand-mark">V</div>
          <div>
            <strong>VendaFácil AI</strong>
            <small>Portal do comerciante</small>
          </div>
        </div>

        <h1>Entrar na demonstração</h1>
        <p>Use uma conta demo para explorar o MVP com dados fictícios.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            <span>E-mail</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              placeholder="demo@vendafacil.ai"
            />
          </label>

          <label>
            <span>Senha</span>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              placeholder="demo123"
            />
          </label>

          {error && <div className="form-alert error">{error}</div>}

          <button type="submit" className="button button-primary full">Entrar</button>
          <button
            type="button"
            className="button button-secondary full"
            onClick={() => {
              setForm({ email: 'demo@vendafacil.ai', password: 'demo123' });
              setError('');
            }}
          >
            Usar credenciais de exemplo
          </button>
        </form>

        <div className="auth-info">
          <strong>Integrações externas:</strong>
          <span>{supabaseSetupNote}</span>
        </div>
      </div>
    </div>
  );
}

function Layout({ children, onLogout }) {
  const location = useLocation();

  const menuItems = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/oportunidades', label: 'Oportunidades' },
    { to: '/prioridades', label: 'Prioridades com IA' },
    { to: '/assistente', label: 'Assistente de mensagens' },
    { to: '/relatorios', label: 'Relatório semanal' }
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-mark small">V</div>
          <div>
            <strong>VendaFácil</strong>
            <small>AI demo</small>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive || location.pathname === item.to ? 'nav-item active' : 'nav-item')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="mini-status">
            <span className="dot green" /> Modo demonstração
          </div>
          <button type="button" className="button button-secondary full" onClick={onLogout}>
            Sair
          </button>
        </div>
      </aside>

      <main className="content-area">
        <div className="mobile-nav">
          {menuItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'mobile-link active' : 'mobile-link')}>
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}

function DashboardPage({ opportunities, company }) {
  const summary = useMemo(() => {
    const total = opportunities.length;
    const waitingResponse = opportunities.filter((item) => item.stage === 'aguardando-resposta' || getDaysSince(item.lastContact) >= 7).length;
    const confirmed = opportunities.filter((item) => item.stage === 'venda-concluida').length;
    const conversion = total > 0 ? (confirmed / total) * 100 : 0;
    const prioritized = [...opportunities]
      .map((item) => ({ ...item, priority: getPriority(item) }))
      .sort((a, b) => b.priority.score - a.priority.score)
      .slice(0, 4);

    const createdForWeek = Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      const dayLabel = date.toLocaleDateString('pt-BR', { weekday: 'short' });
      const totalCreated = opportunities.filter((item) => item.createdAt === date.toISOString().slice(0, 10)).length;

      return { label: dayLabel, value: totalCreated };
    });

    return { total, waitingResponse, confirmed, conversion, prioritized, createdForWeek };
  }, [opportunities]);

  return (
    <>
      <div className="page-header">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>{company?.name || 'Comércio'}</h1>
        </div>
        <Link to="/oportunidades" className="button button-primary">
          Cadastrar oportunidade
        </Link>
      </div>

      <div className="demo-banner">
        <strong>Modo demonstração:</strong> dados fictícios para apresentação do produto. Nenhuma integração real de WhatsApp ou IA está ativa.
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <small>Total de oportunidades</small>
          <strong>{summary.total}</strong>
          <span>cadastros ativos</span>
        </div>
        <div className="stat-card">
          <small>Clientes que precisam de retorno</small>
          <strong>{summary.waitingResponse}</strong>
          <span>atenção necessária</span>
        </div>
        <div className="stat-card">
          <small>Vendas confirmadas</small>
          <strong>{summary.confirmed}</strong>
          <span>conversões fechadas</span>
        </div>
        <div className="stat-card">
          <small>Taxa de conversão</small>
          <strong>{summary.conversion.toFixed(1)}%</strong>
          <span>sobre o total</span>
        </div>
      </div>

      <div className="content-grid two-columns">
        <section className="card section-card">
          <div className="section-title-row">
            <h2>Clientes prioritários</h2>
          </div>
          <div className="priority-list">
            {summary.prioritized.map((item) => (
              <div key={item.id} className="priority-item">
                <div>
                  <strong>{item.clientName}</strong>
                  <span>{item.product}</span>
                </div>
                <div className={`badge ${getPriority(item).badge}`}>{getPriority(item).level}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="card section-card">
          <div className="section-title-row">
            <h2>Desempenho semanal</h2>
          </div>
          <div className="chart-bars">
            {summary.createdForWeek.map((item) => (
              <div key={item.label} className="chart-bar-group">
                <span className="chart-bar" style={{ height: `${Math.max(item.value * 45, 10)}px` }} />
                <small>{item.label}</small>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function OpportunitiesPage({ opportunities, company, onSave, onDelete }) {
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState('todos');
  const [channelFilter, setChannelFilter] = useState('todos');
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(createEmptyOpportunity());

  const filtered = useMemo(() => {
    return opportunities.filter((item) => {
      const searchMatch =
        !search ||
        item.clientName.toLowerCase().includes(search.toLowerCase()) ||
        item.product.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase());

      const stageMatch = stageFilter === 'todos' || item.stage === stageFilter;
      const channelMatch = channelFilter === 'todos' || item.channel === channelFilter;

      return searchMatch && stageMatch && channelMatch;
    });
  }, [opportunities, search, stageFilter, channelFilter]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const opportunity = {
      ...form,
      companyId: company.id,
      value: Number(form.value || 0),
      id: form.id || `OP-${Date.now()}`
    };

    onSave(opportunity);
    setForm(createEmptyOpportunity());
    setEditing(null);
  };

  const startEdit = (item) => {
    setEditing(item.id);
    setForm({ ...item });
  };

  const handleDelete = (id) => {
    onDelete(id);
    if (editing === id) {
      setEditing(null);
      setForm(createEmptyOpportunity());
    }
  };

  return (
    <>
      <div className="page-header stacked">
        <div>
          <span className="eyebrow">Oportunidades</span>
          <h1>Gestão comercial</h1>
        </div>
      </div>

      <div className="toolbar card">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por cliente, produto ou código"
        />
        <select value={stageFilter} onChange={(event) => setStageFilter(event.target.value)}>
          <option value="todos">Todas as etapas</option>
          {stageOptions.map((stage) => (
            <option key={stage.value} value={stage.value}>
              {stage.label}
            </option>
          ))}
        </select>
        <select value={channelFilter} onChange={(event) => setChannelFilter(event.target.value)}>
          <option value="todos">Todos os canais</option>
          {channelOptions.map((channel) => (
            <option key={channel} value={channel}>
              {channel}
            </option>
          ))}
        </select>
      </div>

      <div className="content-grid two-columns">
        <section className="card section-card">
          <div className="section-title-row">
            <h2>{editing ? 'Editar oportunidade' : 'Cadastrar oportunidade'}</h2>
          </div>

          <form onSubmit={handleSubmit} className="opportunity-form">
            <div className="form-grid">
              <label>
                <span>Cliente</span>
                <input
                  type="text"
                  value={form.clientName}
                  onChange={(event) => setForm({ ...form, clientName: event.target.value })}
                  required
                />
              </label>

              <label>
                <span>Produto ou serviço</span>
                <input
                  type="text"
                  value={form.product}
                  onChange={(event) => setForm({ ...form, product: event.target.value })}
                  required
                />
              </label>

              <label>
                <span>Valor estimado</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.value}
                  onChange={(event) => setForm({ ...form, value: event.target.value })}
                  required
                />
              </label>

              <label>
                <span>Canal de contato</span>
                <select value={form.channel} onChange={(event) => setForm({ ...form, channel: event.target.value })}>
                  {channelOptions.map((channel) => (
                    <option key={channel} value={channel}>
                      {channel}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Data do último atendimento</span>
                <input
                  type="date"
                  value={form.lastContact}
                  onChange={(event) => setForm({ ...form, lastContact: event.target.value })}
                  required
                />
              </label>

              <label>
                <span>Etapa da venda</span>
                <select value={form.stage} onChange={(event) => setForm({ ...form, stage: event.target.value })}>
                  {stageOptions.map((stage) => (
                    <option key={stage.value} value={stage.value}>
                      {stage.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="full-span">
                <span>Observações</span>
                <textarea
                  rows="4"
                  value={form.notes}
                  onChange={(event) => setForm({ ...form, notes: event.target.value })}
                />
              </label>

              {form.stage === 'perdida' && (
                <label className="full-span">
                  <span>Motivo da perda</span>
                  <input
                    type="text"
                    value={form.lossReason}
                    onChange={(event) => setForm({ ...form, lossReason: event.target.value })}
                    placeholder="Ex.: concorrência com preço menor"
                  />
                </label>
              )}
            </div>

            <div className="form-actions">
              <button type="submit" className="button button-primary">
                {editing ? 'Salvar alterações' : 'Salvar oportunidade'}
              </button>
              {editing && (
                <button type="button" className="button button-secondary" onClick={() => { setEditing(null); setForm(createEmptyOpportunity()); }}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="card section-card">
          <div className="section-title-row">
            <h2>Lista de oportunidades</h2>
            <span>{filtered.length} itens</span>
          </div>

          <div className="opportunity-list">
            {filtered.length === 0 ? (
              <div className="empty-state">Nenhuma oportunidade encontrada com os filtros atuais.</div>
            ) : (
              filtered.map((item) => (
                <div key={item.id} className="opportunity-item">
                  <div className="opportunity-main">
                    <div>
                      <strong>{item.clientName}</strong>
                      <span>{item.product}</span>
                    </div>
                    <div className="opportunity-meta">
                      <small>{item.id}</small>
                      <small>{item.channel}</small>
                    </div>
                  </div>
                  <div className="opportunity-row">
                    <span>{formatCurrency(item.value)}</span>
                    <span>{stageOptions.find((stage) => stage.value === item.stage)?.label || item.stage}</span>
                  </div>
                  <div className="opportunity-actions">
                    <button type="button" className="text-button" onClick={() => startEdit(item)}>
                      Editar
                    </button>
                    <button type="button" className="text-button danger" onClick={() => handleDelete(item.id)}>
                      Excluir
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
}

function PrioritiesPage({ opportunities }) {
  const prioritized = useMemo(
    () =>
      [...opportunities]
        .map((item) => ({ ...item, priority: getPriority(item), reason: buildPriorityReason(item) }))
        .sort((a, b) => b.priority.score - a.priority.score),
    [opportunities]
  );

  return (
    <>
      <div className="page-header">
        <div>
          <span className="eyebrow">Prioridades com IA</span>
          <h1>Regras transparentes de priorização</h1>
        </div>
      </div>

      <div className="demo-banner subtle">
        <strong>Modo demonstração:</strong> a priorização usa critérios explícitos (tempo sem resposta, interesse, valor e etapa) para apoiar decisões, sem simular inteligência artificial avançada.
      </div>

      <div className="priority-stack">
        {prioritized.map((item) => (
          <div key={item.id} className="priority-card card">
            <div className="priority-top">
              <div>
                <strong>{item.clientName}</strong>
                <small>{item.product}</small>
              </div>
              <span className={`badge ${item.priority.badge}`}>{item.priority.level}</span>
            </div>
            <p>{item.reason}</p>
            <div className="score-line">
              <span>Score de urgência</span>
              <strong>{item.priority.score}</strong>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function MessageAssistantPage({ opportunities }) {
  const [targetId, setTargetId] = useState(opportunities[0]?.id || '');
  const [objective, setObjective] = useState('primeiro-contato');
  const [context, setContext] = useState('O cliente pediu orçamento e está avaliando opções do mercado.');
  const [message, setMessage] = useState('');

  const selectedOpportunity = opportunities.find((item) => item.id === targetId) || opportunities[0];

  useEffect(() => {
    if (!selectedOpportunity && opportunities.length > 0) {
      setTargetId(opportunities[0].id);
    }
  }, [opportunities, selectedOpportunity]);

  const generateMessage = () => {
    if (!selectedOpportunity) {
      setMessage('Selecione uma oportunidade para gerar a mensagem.');
      return;
    }

    const goal = objectiveOptions[objective] || 'Acompanhamento';
    const productName = selectedOpportunity.product;
    const customer = selectedOpportunity.clientName;
    const baseContext = context || 'Cliente demonstrou interesse e busca mais informações.';

    const templates = {
      'primeiro-contato': `Olá ${customer}, tudo bem? Vi que você demonstrou interesse em ${productName}. Estou aqui para ajudar com mais informações e encontrar a melhor opção para seu caso. ${baseContext} Posso te enviar uma proposta ou tirar dúvidas sobre valores, prazos e condições.`,
      acompanhamento: `Olá ${customer}, tudo bem? Espero que esteja bem. Estou acompanhando sua conversa sobre ${productName}. ${baseContext} Gostaria de entender se você gostaria de avançar com uma proposta ou se ainda precisa de mais detalhes para fechar a decisão.`,
      'resposta-duvidas': `Olá ${customer}, agradeço pelo contato. Sobre ${productName}, ${baseContext} Posso te explicar melhor os diferenciais, formas de pagamento e disponibilidade. Se preferir, também posso agendar uma conversa rápida para te ajudar a decidir.`,
      'retomada-negociacao': `Olá ${customer}, tudo bem? Gostaria de retomar a conversa sobre ${productName}. ${baseContext} Ainda estou à disposição para revisar condições, responder dúvidas e avançar com a próxima etapa da negociação. Quando for melhor para você, posso te encaminhar uma proposta atualizada.`
    };

    const variants = [templates[objective], `${templates[objective]} Posso te ajudar com a próxima etapa com agilidade e atenção.`];
    const chosen = variants[Math.floor(Math.random() * variants.length)];
    setMessage(chosen);
  };

  const copyMessage = async () => {
    if (!message) return;
    try {
      await navigator.clipboard.writeText(message);
      alert('Mensagem copiada para a área de transferência.');
    } catch (error) {
      alert('Não foi possível copiar automaticamente. Copie o texto manualmente.');
    }
  };

  return (
    <>
      <div className="page-header">
        <div>
          <span className="eyebrow">Assistente de mensagens</span>
          <h1>Crie uma resposta pronta para o cliente</h1>
        </div>
      </div>

      <div className="assistant-layout card">
        <div className="assistant-form">
          <label>
            <span>Oportunidade</span>
            <select value={targetId} onChange={(event) => setTargetId(event.target.value)}>
              {opportunities.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.clientName} · {item.product}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Objetivo da mensagem</span>
            <select value={objective} onChange={(event) => setObjective(event.target.value)}>
              {Object.entries(objectiveOptions).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Contexto</span>
            <textarea rows="6" value={context} onChange={(event) => setContext(event.target.value)} />
          </label>

          <button type="button" className="button button-primary" onClick={generateMessage}>
            Gerar mensagem
          </button>
        </div>

        <div className="assistant-output">
          <div className="section-title-row">
            <h2>Mensagem sugerida</h2>
          </div>
          <div className="message-box">
            {message || 'A mensagem aparecerá aqui quando você gerar uma sugestão.'}
          </div>
          <div className="form-actions compact">
            <button type="button" className="button button-secondary" onClick={generateMessage}>
              Gerar novamente
            </button>
            <button type="button" className="button button-primary" onClick={copyMessage}>
              Copiar mensagem
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ReportsPage({ opportunities }) {
  const summary = useMemo(() => {
    const total = opportunities.length;
    const atendidas = opportunities.filter((item) => item.stage !== 'novo-contato' && item.stage !== 'perdida').length;
    const concluidas = opportunities.filter((item) => item.stage === 'venda-concluida').length;
    const perdidas = opportunities.filter((item) => item.stage === 'perdida').length;
    const conversion = total > 0 ? (concluidas / total) * 100 : 0;
    const reasons = opportunities
      .filter((item) => item.lossReason)
      .reduce((accumulator, item) => {
        accumulator[item.lossReason] = (accumulator[item.lossReason] || 0) + 1;
        return accumulator;
      }, {});

    const previousPeriod = opportunities.filter((item) => {
      const date = new Date(item.createdAt);
      const now = new Date();
      return date >= new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14) && date <= new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    }).length;

    const currentPeriodCount = opportunities.filter((item) => {
      const date = new Date(item.createdAt);
      const now = new Date();
      return date >= new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    }).length;

    const comparison = currentPeriodCount - previousPeriod;

    return { total, atendidas, concluidas, perdidas, conversion, reasons, comparison };
  }, [opportunities]);

  return (
    <>
      <div className="page-header">
        <div>
          <span className="eyebrow">Relatório semanal</span>
          <h1>Indicadores do período</h1>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <small>Oportunidades cadastradas</small>
          <strong>{summary.total}</strong>
          <span>registros no sistema</span>
        </div>
        <div className="stat-card">
          <small>Oportunidades atendidas</small>
          <strong>{summary.atendidas}</strong>
          <span>com contato ativo</span>
        </div>
        <div className="stat-card">
          <small>Vendas concluídas</small>
          <strong>{summary.concluidas}</strong>
          <span>fechamentos</span>
        </div>
        <div className="stat-card">
          <small>Vendas perdidas</small>
          <strong>{summary.perdidas}</strong>
          <span>perdas registradas</span>
        </div>
      </div>

      <div className="content-grid two-columns">
        <section className="card section-card">
          <div className="section-title-row">
            <h2>Motivos das perdas</h2>
          </div>
          {Object.keys(summary.reasons).length === 0 ? (
            <div className="empty-state">Ainda não há motivos de perda cadastrados.</div>
          ) : (
            <ul className="list-plain">
              {Object.entries(summary.reasons).map(([reason, count]) => (
                <li key={reason}>
                  <span>{reason}</span>
                  <strong>{count}</strong>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card section-card">
          <div className="section-title-row">
            <h2>Taxa de conversão</h2>
          </div>
          <div className="conversion-box">
            <strong>{summary.conversion.toFixed(1)}%</strong>
            <span>de conversão no período atual</span>
          </div>
          <div className="comparison-box">
            <span>Comparação com o período anterior</span>
            <strong>{summary.comparison >= 0 ? '+' : ''}{summary.comparison}</strong>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
"message":"Atualiza o MVP do VendaFácil AI com páginas, navegação, persistência local e regras de priorização em português brasileiro.","owner":"heliowellinghto011-max","path":"src/App.jsx","repo":"vendaf-cil-AI"} ivoq to=functions.create_or_update_file  zonjson  
{