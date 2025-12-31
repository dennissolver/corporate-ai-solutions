'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Mic, MicOff, X, MessageCircle } from 'lucide-react'
import { getAgentForPage } from '@/lib/elevenlabs'
import { VOICE_AGENTS } from '@/lib/constants'

export function VoiceAgent() {
  const [isOpen, setIsOpen] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState<Array<{ role: 'user' | 'agent'; content: string }>>([])
  const pathname = usePathname()
  
  const agentKey = getAgentForPage(pathname)
  const agent = VOICE_AGENTS[agentKey]

  useEffect(() => {
    if (isOpen && transcript.length === 0) {
      setTranscript([{ role: 'agent', content: agent.greeting }])
      setIsSpeaking(true)
      setTimeout(() => setIsSpeaking(false), 3000)
    }
  }, [isOpen, agent.greeting, transcript.length])

  const toggleListening = () => {
    setIsListening(!isListening)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'scale-0' : 'scale-100'
        } bg-accent hover:bg-white text-black shadow-lg hover:shadow-accent/20`}
      >
        <MessageCircle size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-gray-dark border border-gray-border shadow-2xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-border">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isSpeaking ? 'bg-accent animate-pulse' : 'bg-gray-mid'
              }`}>
                <Mic size={18} className={isSpeaking ? 'text-black' : 'text-white'} />
              </div>
              <div>
                <p className="font-bold text-sm">{agent.name}</p>
                <p className="text-xs text-gray-light">{agent.personality}</p>
              </div>
            </div>
            <button onClick={() => { setIsOpen(false); setTranscript([]) }} className="text-gray-light hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="h-64 overflow-y-auto p-4 space-y-4">
            {transcript.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 text-sm ${
                  message.role === 'user' ? 'bg-accent text-black' : 'bg-gray-mid text-white'
                }`}>
                  {message.content}
                </div>
              </div>
            ))}
            {isListening && (
              <div className="flex justify-end">
                <div className="bg-accent/20 text-accent p-3 text-sm animate-pulse">Listening...</div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-border">
            <div className="flex items-center justify-center">
              <button
                onClick={toggleListening}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  isListening ? 'bg-red-500 animate-pulse' : 'bg-accent hover:bg-white'
                } text-black`}
              >
                {isListening ? <MicOff size={24} /> : <Mic size={24} />}
              </button>
            </div>
            <p className="text-center text-xs text-gray-light mt-3">
              {isListening ? 'Tap to stop' : 'Tap to speak'}
            </p>
          </div>

          <div className="p-4 border-t border-gray-border">
            <p className="text-xs text-gray-light mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {['What do you offer?', 'How does pricing work?', 'Tell me about partnership'].map((q) => (
                <button
                  key={q}
                  onClick={() => setTranscript([...transcript, { role: 'user', content: q }])}
                  className="text-xs bg-gray-mid px-3 py-1.5 text-gray-light hover:text-white transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
