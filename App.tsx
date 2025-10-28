
import React, { useState, useMemo } from 'react';

// AnimatedCounter component is defined outside the App component
// to prevent it from being recreated on every render of App.
interface AnimatedCounterProps {
  count: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ count }) => {
  const digits = String(count).split('');

  return (
    <div className="flex items-center justify-center" aria-live="polite">
      {digits.map((digit, index) => (
        <span
          key={index}
          className="inline-block animate-pop-in"
          style={{ animationDelay: `${index * 40}ms` }}
        >
          {digit}
        </span>
      ))}
    </div>
  );
};

const getEncouragementMessage = (count: number): string => {
  if (count === 0) return "さあ、何か書いてみよう！";
  if (count > 0 && count <= 10) return "いいスタート！";
  if (count > 10 && count <= 50) return "その調子！どんどんいこう！";
  if (count > 50 && count <= 100) return "すごい、もう100文字に近づいてる！";
  if (count > 100 && count <= 200) return "ノッてきたね！";
  if (count > 200 && count <= 500) return "素晴らしい集中力！";
  if (count > 500) return "もう誰にも止められない！";
  return "";
};


const App: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const count = text.length;

  const encouragementMessage = useMemo(() => getEncouragementMessage(count), [count]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  
  const circleBaseSize = 100;
  const circleGrowthFactor = 0.5;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full bg-slate-50 text-slate-800 overflow-hidden px-4">
      
      {/* Animated Background Circles */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-100 transition-transform duration-700 ease-out"
        style={{ 
          width: `${circleBaseSize + count * circleGrowthFactor * 2}px`, 
          height: `${circleBaseSize + count * circleGrowthFactor * 2}px`,
          transform: `translate(-50%, -50%) scale(${isFocused ? 1.1 : 1})`,
          opacity: isFocused ? 0.8 : 0.6,
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-100 transition-transform duration-1000 ease-out"
        style={{ 
          width: `${circleBaseSize / 2 + count * circleGrowthFactor}px`, 
          height: `${circleBaseSize / 2 + count * circleGrowthFactor}px`,
          transform: `translate(-50%, -50%) scale(${isFocused ? 1.2 : 1})`,
          opacity: isFocused ? 0.9 : 0.7,
        }}
      />

      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl flex-grow text-center">
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-extrabold text-slate-700 tracking-tighter transition-transform duration-300" style={{transform: `scale(${isFocused ? 1.05 : 1})`}}>
            {/* By changing the key, we force React to re-mount the component, which re-triggers the animation */}
            <AnimatedCounter key={count} count={count} />
          </h1>
          <p className="text-slate-500 text-lg md:text-xl font-bold mt-2">文字</p>
        </div>

        <div className="w-full flex-grow flex flex-col">
          <textarea
            value={text}
            onChange={handleTextChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="ここに文章を書いてみよう..."
            className="w-full h-48 md:h-64 p-6 bg-white/70 backdrop-blur-sm rounded-2xl border-2 border-slate-200 focus:border-sky-400 focus:ring-4 focus:ring-sky-400/20 outline-none resize-none shadow-lg transition-all duration-300 text-lg text-slate-700 leading-relaxed custom-textarea"
            aria-label="テキスト入力エリア"
          />
        </div>
        
        <div className="h-16 mt-4 flex items-center justify-center">
          <p key={encouragementMessage} className="text-emerald-600 font-semibold text-lg animate-slide-in-bottom">
            {encouragementMessage}
          </p>
        </div>
      </main>

      <footer className="relative z-10 py-6 text-slate-400 text-sm">
        <p>Made with ❤️ and React</p>
      </footer>
    </div>
  );
};

export default App;
