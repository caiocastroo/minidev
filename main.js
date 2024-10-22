console.log("Processo Principal")

//Impoetaçâo de pacotes (bibliotecas)
//nativeTheme (forçar um tema no sistema operacional)
//Menu (criar um menu personalizado)
//shell (acessar links externos)
const { app, BrowserWindow, nativeTheme, Menu, shell } = require('electron/main')
const path = require('node:path')

//Janela principal
let win //Impoetante! Neste projeto o escopo da variavel win deve ser global 
function createWindow() {
    nativeTheme.themeSource = 'dark' //Janela sempre escura
    win = new BrowserWindow({
        width: 1010, //largura em px
        height: 720,//altura em px
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    //Menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

   win.loadFile('./src/views/index.html')
}
//Janela sobre 
function aboutWindow(){
    nativeTheme.themeSource = 'dark'
    const about = new BrowserWindow({
        width: 362,
        height: 220,
        autoHideMenuBar: true, //Esconder o menu
        resizable: false, //impedir redirecionamento
        minimizable: false, //impedir minimizar a janela
       //titleBarStyle: 'hidden' //Esconder a barra de estilo (ex: totem de auto atendimento)
    })
    about.loadFile('./src/views/sobre.html')
}


//execuçâo assincrona do app electron 
app.whenReady().then(() => {
    createWindow()
//Comportamento do MAC ao fechar uma janela
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

//Encerrar a aplicaçâo quando a janela for fechada (windows e Linux)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

//templete do menu
const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Novo',
                accelerator: 'CmdOrCtrl+N'
            },
            {
                label: 'Abrir',
                accelerator: 'CmdOrCtrl+O'
            },
            {
                label: 'Salvar',
                accelerator: 'CmdOrCtrl+S'
            },
            {
                label: 'Salvar Como',
                accelerator: 'CmdOrCtrl+Shift+S'
            },
            {
              type: 'separator'
            },
            {
               label: 'Sair',
               accelerator: 'Alt+F4',
               click: () => app.quit()
            },

        ]
    },
    {
        label: 'Editar',
        submenu: [
            {
                label: 'Desfazer',
                role: 'undo'
            },
            {
                label: 'Refazer',
                role: 'redo'
            },
            {
                type: 'separator'
            },
            {
                label: 'Recortar',
                role: 'cut'
            },
            {
                label: 'Copiar',
                role: 'copy'
            },
            {
                label: 'Colar',
                role: 'paste'
            },
        ]
    },
    {
        label: 'Zoom',
        submenu: [
            {
                label: 'Aplicar Zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar o zoom Padrão',
                role: 'resetZoom'
            },
        ]
    },
    {
        label: 'Cor',
        submenu: [
            {
                label: 'Amarelo'
            },
            {
                label: 'Azul'
            },
            {
                label: 'Laranja'
            },
            {
                label: 'Pink'
            },
            {
                label: 'Roxo'
            },
            {
                label: 'Verde'
            },
            {
                type: 'separator'
            },
            {
                label: 'Restaurar a cor Padrão'
            },
        ]
    },
    {
        label: 'Ajuda',
        submenu:[
            {
                label: 'reposítório',
                click: () => shell.openExternal('https://github.com/caiocastroo/minidev')
            },
            {
                label: 'Sobre',
                click: () => aboutWindow()
            }
        ]
    }
]