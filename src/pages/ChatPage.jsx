import { useState, useRef, useEffect } from "react";
import { useApp, PAGES } from "../context/AppContext";
import TopBar from "../components/TopBar";

const AI_QUESTIONS = [
  {
    group: "Understanding the Result?",
    items: [
      { id: "q1", text: "What does this result mean?" },
      { id: "q2", text: "How accurate is this analysis?" },
      { id: "q3", text: "Is the detected tumor benign or malignant?" },
    ],
  },
  {
    group: "Next Steps",
    items: [
      { id: "q4", text: "What should I do next?" },
      { id: "q5", text: "Should I see a doctor?" },
    ],
  },
  {
    group: "Accuracy & Safety",
    items: [
      { id: "q6", text: "Can this result be wrong?" },
    ],
  },
];

const AI_ANSWERS = {
  "What does this result mean?": "This result suggests that the MRI scan shows patterns often linked to malignant tumors. However, this is an AI-assisted analysis and should be confirmed by a medical professional.",
  "How accurate is this analysis?": "The AI model achieves over 90% accuracy in clinical testing. Confidence scores above 85% are generally considered high-reliability results.",
  "Is the detected tumor benign or malignant?": "The analysis indicates patterns consistent with malignant tumor characteristics. A radiologist or oncologist should confirm the diagnosis.",
  "What should I do next?": "We recommend scheduling an appointment with a neurologist or oncologist as soon as possible. Share this analysis along with your MRI scan.",
  "Should I see a doctor?": "Yes, absolutely. AI analysis is a screening tool only. A qualified physician must evaluate your results and medical history before any conclusion.",
  "Can this result be wrong?": "Yes, no AI system is 100% accurate. False positives and negatives are possible. Always consult a medical professional for a definitive diagnosis.",
};

export default function ChatPage() {
  const { navigate } = useApp();
  const [messages, setMessages] = useState([
    { role: "ai", text: "I can explain your MRI results, please choose a question below." }
  ]);
  const [chatStarted, setChatStarted] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addMessage = (userText) => {
    const answer = AI_ANSWERS[userText] || "Thank you for your question. Please consult a medical professional for personalized advice.";
    setMessages(prev => [...prev, { role: "user", text: userText }]);
    setChatStarted(true);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: "ai", text: answer }]);
    }, 1200);
  };

  const handleSend = () => {
    if (!inputText.trim() || isTyping) return;
    addMessage(inputText.trim());
    setInputText("");
  };

  return (
<div style={{ display: "flex", flexDirection: "column", overflow: "hidden", height: "100vh", background: "var(--bg)" }}>      {/* Header */}
      <div style={{ flexShrink: 0 }}>
        <TopBar title="Chat with AI" />
        <div style={{ padding: "0 20px 10px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 10, height: 10, borderRadius: "50%",
            background: "#22C55E", display: "inline-block"
          }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)" }}>Online</span>
          <div style={{ marginLeft: "auto" }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "var(--primary-dark)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20,
            }}>🤖</div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "0 20px",
        display: "flex", flexDirection: "column", gap: 10,
      }}>
        {messages.map((msg, i) => {
          const isAI = msg.role === "ai";
          return (
            <div key={i} style={{ display: "flex", justifyContent: isAI ? "flex-start" : "flex-end" }}>
              <div style={{
                padding: "13px 16px",
                borderRadius: 18,
                borderBottomLeftRadius: isAI ? 4 : 18,
                borderBottomRightRadius: isAI ? 18 : 4,
                fontSize: 14, lineHeight: 1.55, maxWidth: "82%",
                background: isAI ? "var(--primary-lighter)" : "var(--primary)",
                color: isAI ? "var(--text-primary)" : "#fff",
                whiteSpace: "pre-line",
                fontWeight: isAI ? 500 : 600,
              }}>
                {msg.text}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{
              padding: "13px 18px", borderRadius: 18, borderBottomLeftRadius: 4,
              background: "var(--primary-lighter)", display: "flex", gap: 5, alignItems: "center",
            }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: "var(--primary)",
                  animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
                  display: "inline-block",
                }} />
              ))}
            </div>
          </div>
        )}

        {!chatStarted && (
          <div style={{ paddingTop: 8 }}>
            {AI_QUESTIONS.map(({ group, items }) => (
              <div key={group} style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)", marginBottom: 8 }}>
                  {group}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {items.map(q => (
                    <button
                      key={q.id}
                      onClick={() => addMessage(q.text)}
                      className="chat-question-btn"
                    >
                      {q.text}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-muted)", padding: "8px 0 14px" }}>
              — Select a question and continue —
            </p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Disclaimer */}
      <div style={{
        margin: "0 20px 4px",
        background: "var(--white)",
        borderRadius: "var(--radius-md)",
        padding: "10px 14px",
        display: "flex", alignItems: "center", gap: 8,
        border: "1px solid var(--border)",
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 16 }}>🤖</span>
        <span style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 600 }}>
          This AI assistant provides informational support only.
        </span>
      </div>

      {/* Input bar */}
      <div style={{ padding: "10px 20px 16px", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            className="input"
            placeholder="Ask about your results..."
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            style={{ flex: 1 }}
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping}
            style={{
              width: 48, height: 48, flexShrink: 0,
              background: !inputText.trim() || isTyping ? "#A5C9C9" : "var(--primary)",
              border: "none", borderRadius: "var(--radius-md)",
              cursor: !inputText.trim() || isTyping ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.2s",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}
