export const supabaseConfig = {
  enabled: false,
  warning: 'Integração com Supabase aguardando configuração em ambiente real. Esta versão usa dados de demonstração locais.',
  url: '',
  anonKey: ''
};

export function getSupabaseSetupNote() {
  return 'Configure URL e anon key em variáveis de ambiente para habilitar autenticação e armazenamento com Supabase.';
}
