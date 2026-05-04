import { useState, useRef, useEffect } from "react";
import { useApp } from "../context/AppContext";

const SYSTEM_MSG = "Hello! I'm NeuroAI, your brain health assistant. I can answer questions about brain tumors, MRI analysis, and help you understand your scan results. How can I help you?";

const CANNED = [
  { q: /what.*tumor/i,        a: "Brain tumors are abnormal growths of cells in the brain. They can be benign (non-cancerous) or malignant (cancerous). The AI analyzes MRI characteristics to classify tumors." },
  { q: /malignant/i,          a: "Malignant tumors are cancerous and can grow and spread. A malignant result means you should consult a neurologist or oncologist immediately for a complete evaluation." },
  { q: /benign/i,             a: "Benign tumors are non-cancerous. They can still cause symptoms depending on their location, so follow-up with your doctor is still recommended even with a benign result." },
  { q: /accurate|accuracy/i,  a: "Our AI model achieves approximately 95% accuracy on validated MRI datasets. It is designed to assist — not replace — professional medical diagnosis." },
  { q: /how.*work|how does/i, a: "The AI analyzes your MRI image using a deep convolutional neural network trained on thousands of labeled scans. It identifies tumor patterns and outputs a classification with a confidence score." },
  { q: /upload|scan/i,        a: "To upload a scan, tap the Upload tab at the bottom of the screen. Select your MRI image file, then tap 'Analyze Scan' to get results." },
  { q: /safe|privacy|data/i,  a: "Your data is encrypted in transit and at rest. We never share your scans with third parties. You can delete your data at any time from the Privacy section in your profile." },
];

export default function ChatPage() {
  const { user } = useApp();
  const [messages, setMessages] = useState([
    { id: 1, from: "ai", text: SYSTEM_MSG, time: now() },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg = { id: Date.now(), from: "user", text, time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const matched = CANNED.find(c => c.q.test(text));
      const reply = matched?.a || "That's a great question! For personalized medical advice, please consult a qualified healthcare professional. I can answer general questions about brain tumors and our AI analysis.";
      setMessages(prev => [...prev, { id: Date.now() + 1, from: "ai", text: reply, time: now() }]);
      setTyping(false);
    }, 900);
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.aiAvatar}>🤖</div>
        <div>
          <div style={styles.aiName}>NeuroAI</div>
          <div style={styles.aiStatus}>● Online</div>
        </div>
      </div>

      {/* Messages */}
      <div style={styles.messages}>
        {messages.map(msg => (
          <div key={msg.id} style={{ ...styles.msgRow, justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
            {msg.from === "ai" && <div style={styles.aiBubbleAvatar}>🤖</div>}
            <div style={{ maxWidth: "78%" }}>
              <div style={msg.from === "user" ? styles.userBubble : styles.aiBubble}>
                {msg.text}
              </div>
              <div style={{ ...styles.time, textAlign: msg.from === "user" ? "right" : "left" }}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        {typing && (
          <div style={{ ...styles.msgRow, justifyContent: "flex-start" }}>
            <div style={styles.aiBubbleAvatar}>🤖</div>
            <div style={styles.typingBubble}>
              <span style={styles.dot} /><span style={styles.dot} /><span style={styles.dot} />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div style={styles.suggestions}>
        {["What is a malignant tumor?", "How accurate is the AI?", "Is my data safe?"].map(s => (
          <button key={s} style={styles.suggestion} onClick={() => { setInput(s); }}>
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={styles.inputRow}>
        <input
          style={styles.input}
          placeholder="Ask about brain tumors…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button style={styles.sendBtn} onClick={sendMessage} disabled={!input.trim()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

function now() {
  return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

const styles = {
  page:          { display: "flex", flexDirection: "column", height: "100dvh", background: "#F9FAFB", fontFamily: "'Segoe UI', sans-serif" },
  header:        { display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", background: "#fff", borderBottom: "1px solid #E5E7EB" },
  aiAvatar:      { width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #2E8B8B, #0d3d3d)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 },
  aiName:        { fontSize: 15, fontWeight: 700, color: "#111" },
  aiStatus:      { fontSize: 12, color: "#10B981", fontWeight: 500 },
  messages:      { flex: 1, overflowY: "auto", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 16 },
  msgRow:        { display: "flex", gap: 10, alignItems: "flex-end" },
  aiBubbleAvatar:{ width: 32, height: 32, borderRadius: "50%", background: "#E0F7FA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 },
  aiBubble:      { background: "#fff", border: "1px solid #E5E7EB", borderRadius: "4px 16px 16px 16px", padding: "12px 14px", fontSize: 14, color: "#374151", lineHeight: 1.6 },
  userBubble:    { background: "#2E8B8B", color: "#fff", borderRadius: "16px 4px 16px 16px", padding: "12px 14px", fontSize: 14, lineHeight: 1.6 },
  time:          { fontSize: 11, color: "#D1D5DB", marginTop: 4 },
  typingBubble:  { background: "#fff", border: "1px solid #E5E7EB", borderRadius: "4px 16px 16px 16px", padding: "14px 18px", display: "flex", gap: 6, alignItems: "center" },
  dot:           { display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#2E8B8B", animation: "bounce .9s ease-in-out infinite" },
  suggestions:   { display: "flex", gap: 8, padding: "10px 16px", overflowX: "auto", scrollbarWidth: "none" },
  suggestion:    { whiteSpace: "nowrap", padding: "7px 12px", background: "#fff", border: "1.5px solid #E5E7EB", borderRadius: 20, fontSize: 12, color: "#2E8B8B", fontWeight: 500, cursor: "pointer", flexShrink: 0 },
  inputRow:      { display: "flex", gap: 10, padding: "12px 16px 24px", background: "#fff", borderTop: "1px solid #E5E7EB" },
  input:         { flex: 1, padding: "12px 16px", border: "1.5px solid #E5E7EB", borderRadius: 12, fontSize: 14, color: "#111", outline: "none" },
  sendBtn:       { width: 46, height: 46, borderRadius: 12, background: "#2E8B8B", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
};
