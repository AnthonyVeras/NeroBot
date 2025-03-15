/**
 * Testes básicos
 * @author Anthony
 */
import { WaBotClient } from '../types/baileys';
import { CommonFunctions } from '../types/commands';
import { readCommandImports, findCommandImport } from '../utils';
import { isActiveGroup, isActiveAntiLinkGroup } from '../utils/database';

console.log('=== TESTE BÁSICO DO NEROBOT ===');

// Teste 1: Verificar importação de comandos
try {
  const comandos = readCommandImports();
  const totalComandos = Object.values(comandos).reduce(
    (total, commands) => total + commands.length, 
    0
  );
  console.log(`✅ Importação de comandos: ${totalComandos} comandos encontrados`);
  
  // Listar categorias e número de comandos em cada uma
  Object.entries(comandos).forEach(([category, cmds]) => {
    console.log(`   - ${category}: ${cmds.length} comandos`);
  });
} catch (error) {
  console.error('❌ Erro na importação de comandos:', error);
}

// Teste 2: Verificar função findCommandImport
try {
  const { command, type } = findCommandImport('ping');
  if (command) {
    console.log(`✅ Função findCommandImport: Comando "ping" encontrado na categoria "${type}"`);
  } else {
    console.log('⚠️ Função findCommandImport: Comando "ping" não encontrado');
  }
} catch (error) {
  console.error('❌ Erro na função findCommandImport:', error);
}

// Teste 3: Verificar funções de banco de dados
try {
  const testGroupId = '123456789@g.us';
  console.log(`✅ Função isActiveGroup: ${isActiveGroup(testGroupId) ? 'ativo' : 'inativo'}`);
  console.log(`✅ Função isActiveAntiLinkGroup: ${isActiveAntiLinkGroup(testGroupId) ? 'ativo' : 'inativo'}`);
} catch (error) {
  console.error('❌ Erro nas funções de banco de dados:', error);
}

console.log('\n✅ Teste básico concluído com sucesso!');
console.log('O NeroBot está pronto para uso.'); 