"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Copy, Twitter, RefreshCw, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const excuses = {
  trabalho: [
    "Um gato hacker invadiu meu Wi-Fi e apagou meu alarme! 🐱💻",
    "Meu café da manhã ganhou vida e fugiu, tive que persegui-lo pela cidade! ☕🏃‍♂️",
    "Um esquadrão de pombos sequestrou meu ônibus! 🐦✈️",
    "Meu despertador entrou em greve sindical! ⏰🪧",
    "Fui abduzido por aliens que queriam aprender sobre planilhas do Excel! 👽📊",
    "Um unicórnio bloqueou minha garagem e só aceita pagamento em arco-íris! 🦄🌈",
    "Meu cachorro comeu minha agenda e agora só lembra dos compromissos em latim! 🐕📅",
    "Um portal dimensional se abriu no meu banheiro e me transportou para 1823! 🌀⏰",
    "Minha sombra decidiu tirar férias e me deixou invisível! 👤🏖️",
    "Um exército de formigas organizou um bloqueio na minha porta! 🐜⚔️",
    "Meu GPS ganhou consciência e se recusou a me levar ao trabalho! 🗺️🤖",
    "Um mago transformou meu carro em abóbora à meia-noite! 🧙‍♂️🎃",
    "Fui convocado para ser juiz em uma competição de karaokê entre robôs! 🤖🎤",
    "Meu espelho mágico disse que hoje não era meu dia de trabalhar! 🪞✨",
    "Um dragão fez ninho no meu telhado e está cobrando pedágio! 🐉🏠",
    "Minha cafeteira entrou em modo de hibernação e não quer acordar! ☕😴",
    "Um time de ninjas-esquilos invadiu minha cozinha! 🐿️⚔️",
    "Fui sequestrado por piratas do tempo que queriam minha receita de bolo! 🏴‍☠️⏰",
    "Meu Wi-Fi foi hackeado por pinguins da Antártida! 🐧💻",
    "Um meteorito de chocolate caiu no meu quintal e tive que protegê-lo! ☄️🍫",
  ],
  relacionamentos: [
    "Meu celular foi sequestrado por um grupo de emojis rebeldes! 📱😤",
    "Estava ocupado ensinando minha planta a falar e ela finalmente disse 'oi'! 🌱💬",
    "Um mago transformou meu telefone em uma batata por 24 horas! 🧙‍♂️🥔",
    "Fui recrutado secretamente pela NASA para uma missão ultra-secreta! 🚀🤫",
    "Meu gato aprendeu a usar o celular e deletou todas as minhas mensagens! 🐱📱",
    "Estava preso em um loop temporal onde o mesmo dia se repetia infinitamente! ⏰🔄",
    "Um robô do futuro veio me avisar que responder mensagens causaria o apocalipse! 🤖⚡",
    "Minha sombra ganhou vida própria e escondeu meu telefone! 👤📱",
    "Fui abduzido por aliens que queriam estudar o comportamento humano no WhatsApp! 👽📲",
    "Meu telefone entrou em modo zen e se recusou a receber notificações! 📱🧘‍♂️",
    "Um vírus de timidez infectou meu teclado e ele não consegue digitar! ⌨️😳",
    "Estava ocupado traduzindo mensagens para linguagem de golfinhos! 🐬💬",
    "Meu autocorretor ganhou vida própria e só escreve em élfico! 📱🧝‍♂️",
    "Um portal se abriu no meu bolso e sugou todas as notificações! 🌀📱",
    "Fui convocado para ser mediador em uma briga entre emojis! 😀⚔️😢",
    "Minha bateria entrou em greve por excesso de uso! 🔋🪧",
    "Um fantasma do século XVIII não entende tecnologia moderna! 👻📱",
    "Estava ocupado decifrando mensagens secretas de pássaros! 🐦🔍",
    "Meu telefone foi possuído pelo espírito de um telegrafista! 📱👻",
    "Um cupido digital hackeou meu celular e só permite mensagens de amor! 💘📱",
  ],
  estudos: [
    "Meus livros organizaram uma revolução e se recusaram a ser lidos! 📚⚔️",
    "Um vírus de preguiça infectou meu cérebro através do YouTube! 🧠📺",
    "Aliens abduzeram minha motivação para estudar! 👽✨",
    "Meu caderno ganhou vida e fugiu para o circo! 📓🎪",
    "Um dragão fez ninho na minha mesa de estudos! 🐉📚",
    "Fui hipnotizado por um vídeo de gatos e acordei 3 dias depois! 😵🐱",
    "Minha caneta entrou em greve por excesso de trabalho! ✏️🪧",
    "Um buraco negro se formou na minha mochila e sugou todos os materiais! 🕳️🎒",
    "Meu cérebro entrou em modo de hibernação como um urso! 🧠🐻",
    "Um exército de traças comeu todos os meus resumos! 🦋📄",
    "Fui convocado para ensinar matemática para unicórnios! 🦄➕",
    "Minha calculadora ganhou consciência e se recusou a fazer contas! 🧮🤖",
    "Um mago transformou todas as minhas anotações em hieróglifos! 🧙‍♂️📜",
    "Meu computador foi possuído pelo fantasma de um estudante do século XIX! 💻👻",
    "Um portal temporal me transportou para a época dos dinossauros! 🦕⏰",
    "Minha mesa de estudos foi abduzida por aliens colecionadores! 👽🛸",
    "Um vírus de distração infectou todos os meus dispositivos! 📱🦠",
    "Fui recrutado para ser tutor particular de um dragão bebê! 🐲👶",
    "Meus óculos entraram em greve e se recusaram a focar! 👓🪧",
    "Um esquadrão de borboletas organizou uma rave na minha biblioteca! 🦋🎉",
  ],
  geral: [
    "Estava ocupado salvando o mundo de uma invasão de patos de borracha! 🦆🌍",
    "Meu reflexo no espelho ganhou vida própria e assumiu o controle! 🪞👤",
    "Fui convocado para ser juiz em uma competição de dança entre robôs! 🤖💃",
    "Um time de ninjas-esquilos invadiu minha casa! 🐿️⚔️",
    "Estava preso em uma dimensão onde tudo é feito de gelatina! 🍮🌈",
    "Meu GPS ganhou consciência e decidiu me levar para uma aventura! 🗺️🚗",
    "Fui escolhido para ser o novo porta-voz oficial dos flamingos! 🦩📢",
    "Um meteorito de chocolate caiu no meu quintal e tive que protegê-lo! ☄️🍫",
    "Minha sombra entrou em greve e agora estou oficialmente sem sombra! 👤🪧",
    "Fui abduzido por aliens que queriam aprender a fazer brigadeiro! 👽🍫",
    "Um portal se abriu na minha geladeira e me transportou para Narnia! 🚪❄️",
    "Meu cachorro aprendeu a falar e agora só fala em francês! 🐕🇫🇷",
    "Um mago transformou minha casa em um castelo inflável! 🧙‍♂️🏰",
    "Fui convocado para ser árbitro em uma partida de xadrez entre pinguins! 🐧♟️",
    "Minha cafeteira ganhou consciência e agora só faz café gourmet! ☕🎩",
    "Um exército de flamingos cor-de-rosa invadiu meu jardim! 🦩💗",
    "Estava ocupado ensinando yoga para tartarugas ninjas! 🐢🧘‍♂️",
    "Meu despertador foi sequestrado por piratas do tempo! ⏰🏴‍☠️",
    "Um unicórnio me contratou como seu personal trainer! 🦄💪",
    "Fui escolhido para ser o novo embaixador intergaláctico da Terra! 🌍👽",
    "Minha geladeira entrou em modo de hibernação e congelou tudo! 🧊❄️",
    "Um dragão bebê adotou minha casa como ninho! 🐲🏠",
    "Estava ocupado mediando uma discussão entre meus dois cérebros! 🧠⚖️🧠",
    "Meu Wi-Fi foi hackeado por gnomos digitais! 🧙‍♂️💻",
  ],
}

const categories = {
  trabalho: { name: "Trabalho", emoji: "💼", color: "bg-blue-500" },
  relacionamentos: { name: "Relacionamentos", emoji: "💕", color: "bg-pink-500" },
  estudos: { name: "Estudos", emoji: "📚", color: "bg-green-500" },
  geral: { name: "Geral", emoji: "🎭", color: "bg-purple-500" },
}

export default function ExcuseGenerator() {
  const [currentExcuse, setCurrentExcuse] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof excuses>("geral")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const generateExcuse = () => {
    setIsGenerating(true)

    setTimeout(() => {
      const categoryExcuses = excuses[selectedCategory]
      const randomExcuse = categoryExcuses[Math.floor(Math.random() * categoryExcuses.length)]
      setCurrentExcuse(randomExcuse)
      setIsGenerating(false)
    }, 500)
  }

  const copyToClipboard = async () => {
    if (!currentExcuse) return

    try {
      await navigator.clipboard.writeText(currentExcuse)
      toast({
        title: "Desculpa copiada! 📋",
        description: "Agora é só colar onde precisar! 😄",
      })
    } catch (err) {
      toast({
        title: "Ops! 😅",
        description: "Não consegui copiar. Tente selecionar o texto manualmente.",
        variant: "destructive",
      })
    }
  }

  const shareOnTwitter = () => {
    if (!currentExcuse) return

    const text = encodeURIComponent(`${currentExcuse}\n\n#DesculpasCriativas #Humor`)
    const url = `https://twitter.com/intent/tweet?text=${text}`
    window.open(url, "_blank")
  }

  const getTotalExcuses = () => {
    return Object.values(excuses).reduce((total, categoryExcuses) => total + categoryExcuses.length, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-black text-white mb-4 drop-shadow-lg">🎭 GERADOR DE DESCULPAS 🎭</h1>
          <p className="text-xl text-white/90 font-semibold mb-2">
            Desculpas criativas e hilárias para qualquer situação! 😂
          </p>
          <Badge variant="secondary" className="text-lg px-4 py-2">
            {getTotalExcuses()}+ desculpas épicas disponíveis! 🚀
          </Badge>
        </div>

        {/* Category Selector */}
        <Card className="mb-8 border-4 border-white shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
            <CardTitle className="text-2xl font-bold text-center">🎯 Escolha sua Situação</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Select
              value={selectedCategory}
              onValueChange={(value: keyof typeof excuses) => setSelectedCategory(value)}
            >
              <SelectTrigger className="w-full text-lg h-14 border-2 border-gray-300">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(categories).map(([key, category]) => (
                  <SelectItem key={key} value={key} className="text-lg py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.emoji}</span>
                      <span className="font-semibold">{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Generate Button */}
        <div className="text-center mb-8">
          <Button
            onClick={generateExcuse}
            disabled={isGenerating}
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-6 px-12 rounded-full text-xl shadow-2xl transform hover:scale-105 transition-all duration-200 border-4 border-white"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="mr-3 h-6 w-6 animate-spin" />
                Gerando Desculpa...
              </>
            ) : (
              <>
                <Zap className="mr-3 h-6 w-6" />
                Gerar Desculpa Épica!
              </>
            )}
          </Button>
        </div>

        {/* Excuse Display */}
        {currentExcuse && (
          <Card className="mb-8 border-4 border-white shadow-2xl transform animate-pulse">
            <CardHeader className={`${categories[selectedCategory].color} text-white`}>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl">{categories[selectedCategory].emoji}</span>
                <CardTitle className="text-2xl font-bold">
                  Sua Desculpa para {categories[selectedCategory].name}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8 bg-gradient-to-br from-yellow-50 to-orange-50">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800 leading-relaxed mb-6">{currentExcuse}</p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="bg-white hover:bg-gray-50 border-2 border-gray-300 font-semibold py-3 px-6 rounded-full"
                  >
                    <Copy className="mr-2 h-5 w-5" />
                    Copiar Desculpa
                  </Button>

                  <Button
                    onClick={shareOnTwitter}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full"
                  >
                    <Twitter className="mr-2 h-5 w-5" />
                    Compartilhar no Twitter
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Fun Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(categories).map(([key, category]) => (
            <Card key={key} className="border-2 border-white shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-3xl mb-2">{category.emoji}</div>
                <div className="font-bold text-gray-700">{category.name}</div>
                <Badge variant="secondary" className="mt-2">
                  {excuses[key as keyof typeof excuses].length} desculpas
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-white/80 text-lg font-semibold">
          <p>💡 Dica: Use com moderação e sempre com bom humor! 😄</p>
          <p className="text-sm mt-2">Feito com 💖 e muito humor para alegrar seu dia!</p>
        </div>
      </div>
    </div>
  )
}
