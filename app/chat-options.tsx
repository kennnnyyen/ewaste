"use client";

import { useRef } from "react";

const whatsappNumber = "61434285829";
// Replace with the Facebook business Page username or ID when it is ready.
const messengerPage = "";
const message = "Hi Recore, I'd like to enquire about computer scrap recycling or data destruction.";
const channels = [
  { name: "WhatsApp", href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}` },
  { name: "Messenger", href: messengerPage ? `https://m.me/${encodeURIComponent(messengerPage)}` : null },
];

function ChannelLinks() {
  return channels.map(({ name, href }) => href ? (
    <a className="chat-channel" href={href} key={name} target="_blank" rel="noopener noreferrer">
      <span>{name}</span><span aria-hidden="true">↗</span>
    </a>
  ) : (
    <span className="chat-channel chat-channel-pending" key={name} aria-disabled="true">
      <span>{name}</span><small>Coming soon</small>
    </span>
  ));
}

export function ContactChatLinks() {
  return (
    <div className="contact-chat" aria-label="Message Recore">
      <p>Prefer to message us? Share your requirements or component photos.</p>
      <ChannelLinks />
    </div>
  );
}

export default function ChatOptions() {
  const toggleRef = useRef<HTMLElement>(null);

  return (
    <details className="chat-widget" onKeyDown={(event) => {
      if (event.key === "Escape") {
        event.currentTarget.open = false;
        toggleRef.current?.focus();
      }
    }}>
      <summary ref={toggleRef}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20 11.5a8.5 8.5 0 0 1-8.5 8.5H4l-1 1v-9.5a8.5 8.5 0 0 1 17 0Z" /><path d="M7 9h9M7 13h6" /></svg>
        Chat with us
      </summary>
      <div className="chat-panel">
        <strong>Talk to Recore</strong>
        <p>Ask about scrap quotes or data destruction.</p>
        <ChannelLinks />
      </div>
    </details>
  );
}
