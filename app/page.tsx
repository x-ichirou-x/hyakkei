/**
 * メインページ
 * 
 * 音量制御と明度調整のデモアプリケーション
 * Noto Sans JPフォント対応版
 * 
 * @author Medical Insurance System
 * @version 2.0.0
 */

"use client"

import { useState } from "react"
 
import { Slider } from "@/components/ui/slider"
import { Volume2, VolumeX } from "lucide-react"

export default function Home() {
  const [volume, setVolume] = useState([70])
  const [isMuted, setIsMuted] = useState(false)

  const handleVolumeChange = (value: number[]) => {
    setVolume(value)
    if (value[0] === 0) {
      setIsMuted(true)
    } else {
      setIsMuted(false)
    }
  }

  const toggleMute = () => {
    if (isMuted) {
      setVolume([70])
      setIsMuted(false)
    } else {
      setVolume([0])
      setIsMuted(true)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 p-8 bg-semantic-bg">
      <h1 className={`text-display font-semibold text-semantic-fg mb-8`}>Hello World</h1>
      
      <div className="w-full max-w-md space-y-6">
        <div className="card-standard">
          <h2 className={`text-h2 font-semibold mb-4 text-semantic-fg`}>音量制御</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-caption text-semantic-fg-subtle`}>音量: {volume[0]}%</span>
              <button
                onClick={toggleMute}
                className="p-2 rounded-md hover:bg-semantic-accent/10 transition-normal focus-ring"
                aria-label={isMuted ? "ミュート解除" : "ミュート"}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
            </div>
            
            <Slider
              value={volume}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              className="w-full"
            />
            
            <div className="flex gap-2">
              <button
                onClick={() => setVolume([0])}
                className={`px-3 py-1 text-body border rounded hover:bg-semantic-accent/10 transition-normal focus-ring button-standard`}
              >
                ミュート
              </button>
              <button
                onClick={() => setVolume([50])}
                className={`px-3 py-1 text-body border rounded hover:bg-semantic-accent/10 transition-normal focus-ring button-standard`}
              >
                50%
              </button>
              <button
                onClick={() => setVolume([100])}
                className={`px-3 py-1 text-body border rounded hover:bg-semantic-accent/10 transition-normal focus-ring button-standard`}
              >
                最大
              </button>
            </div>
          </div>
        </div>

        <div className="card-standard">
          <h2 className={`text-h2 font-semibold mb-4 text-semantic-fg`}>明度調整</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-caption text-semantic-fg-subtle`}>明度: {volume[0]}%</span>
            </div>
            
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
