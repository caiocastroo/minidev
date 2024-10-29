/**
 * Segurança e Desempenho
 */

const { contextBridge, ipcRenderer } = require('electron')

//Processos de comunicação entre renderer e main
contextBridge.exposeInMainWorld('api', {
//A linha abaixo cria uma função que enviar uma menssagem ao processo principal
    fecharJanela: () => ipcRenderer.send('close-about')
})