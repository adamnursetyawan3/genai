// lib/richantidownload.js
// HELPER RICH HTML DAN GENAI MENGGUNAKAN PROTOCOLMESSAGE TYPE 14 EDIT GLITCH
import crypto from 'node:crypto';
import { Buffer } from 'buffer';

export const META_AI_BOT_JID = '867051314767696@bot';
export const FORWARD_ORIGIN_META_AI = 4;
export const DEFAULT_BOT_RESPONSE_ID = 'b2e40280-433c-45d8-9c1a-270bec558860';

export const DEFAULT_HTML_PROOF = {
  version: 1,
  useCase: 1,
  signature:
    'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LVZlcmlmaWNhdGlvblNpZ25hdHVyZS5NZXRhZGF0YeN55YRyad2+ZA==',
  certificateChain: [
    'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGEOvtJr968bbpKdZreOTwkk9aPN++XPE60RfuzNLkXXc7LE8BOkJOWRpo2oNXaRJ3uCNJ43HY3A+oetnvHSfcxWqmvvTSrBOI5V1NOD6RMsZ/st1XVPUx83AGps1l5jYBOYzqMNy6un2tToJ2Bt9bXRo29tWLZTu8m7TNY/hISwVpVc5tjSet5U7btPN+dMIx2UvykB1jcbWGsdklheeuz8RXSStNXzeaGvsf1lpZ/ugLE4b2BdmlRNKrY6zLE4qFtRYQoS7axOyQX+4QUyN2m9bfm7urQmn+QRSXJwMO7X5kAJJLbkVGJFt9Pm9VXPwQVrK2aaqiXlpusj+7DfDw00OULmYMmZDTqXM0nUVLxj13z0LhMQoQhhNG8utdUn4uKOFceliTZ/xiP+A54GnX9620641bqw3ctfh9NNXPsTEK8hAUD7FDqUhVntHmoEYYEHq8X1tHHZYP49/f2iezTiE8AUaoZo42/jIWQIKohOGNUib2hEqMkW8NsR8vPihvNuqPc0zKZcl6359YFQdjiiW8kCRD/rsDOr9v1eYLFZKYloFyzFqEgj+jcG/V47elOjShJ5CCPwatXwP6HIloVwtgygFsnOFmCg6Ojoivfoz8Nw1qxFwg5OU2cq/1WbWNELKnaFg4eUWCAIJ/3ZIJsEPkgemZxGhE+hdiNn9dkQYBJs1kx2BxdIkJmQ9vJSKkrMz6lTxZM3IJ9mhmKS6zYdU1ppeAao0/ayte997DQParb/AHLN79g0iW1ad0z8ir5jAl0q3a+UZPTSa4YiSqC2PZ/gfxG5wvL2mKmeKowG0RXjmEp5iNxrni+T/HRLZOoH7y0DQ24nMCPg',
    'TklYRUwuTWVzc2FnZUJ1aWxkZXJWNC43LUNlcnRpZmljYXRlQ2hhaW4uTWV0YWRhdGHsL0Ccm0ELINFZ2IaBhKaeWnVuh0o6nZLCioCn9xpSADzwIS5VCWO+1eVXT2atJOyf7FYlpB0/JA3Us+aQtekuIkHu/zBXijORZ4ClF4+sF3cSTNg6gY/+6iwLK/zs3bMg+GeJrcI65vXfs95Shxlb2Rd5GRT2/2yBmR6Zkf5QwMJuptUHWtM26WY7/xlkEKGFYDZVqOSylusiOzSALa815zC6dCiHoJNLBEKMlaZZQOk57/+OYoU5zzTaEgLhyvNFHSyAlyLQ3SGFtVHAaJZHSmmSPyJowCOB+92Gkk6SWVMsk6FbU8QJWFtlhzV/W/gZ7WzUlS/AKgN0th9/cq20ToFkW7X9c+rtYavufmuieqFhXgaMD8AGsoN9QC/HzNC9D1nydPfFYEUr9BHVy2nF5gM58Y59r2rT8p5LPARIkUp8g+5DLhyW0tdZFZ1305o4AHCayZnp5rjcU2Xi/c1Qf/djBGakmijlMs4aMzKJYD0c4Q8jdI7sNyd876K2wRD+L6KeD2QB3PtCS4P7BWAl5gh5CJ6ZBrwcaKXZqcSjEwm52MqVCgYZdapAaNYUy/QndttjLOG0wxxwuX1hIhMjPnIKZR1kwnqD5EqlHpilrnojRZvjVGN4zEKmilS8rNstt4HHs/D849W+Q6LRVWiWMs0cT2IugrX+Skxd8En7Gq52UEmuVBrSTpN+UpIu20NsVb9lsvuYh3XO441606tOEY2eKcZJdTtqrOTNqbbTk0zVn1yhbOCvmfctBNDhTwaC5QMi0P9wjU5XI9SBtkdQLizc5oqpoiHeqgb8+aJHVLcbgIJ/KLZKtRWFDfzRNM02Csx4etUUapVd2NA/L0oMs/O5T9sVj9FBJ7q99GWr3PVmxJb36mHZLXC4k1gGN9swE0LtzYsUdT5tUo9ri/hS3W/SM+F1p4Kh4QIgRcG3ciIHGN44bnDh3HDCz0fDnzKYw0bclMxZPctEyJ5gEOPF6OAkjD9dEaRGq/tEPf1k9Aub+v2dEjnfrYWAm4E5Zfhs2Xh0CT0k+SzhgKd0K/46ChJ20G5+blwpIvahvTVS68+aVIX6CwXs4tcVx6FnmVsMOOkIasfaqQLZYbNBkuLoZnQAq4j8yRekrQ=='
  ]
};

// ENVELOPE BOTFORWARDEDMESSAGE UNTUK UNIFIEDRESPONSE
export function makeBotMessage(data) {
  return {
    botForwardedMessage: {
      message: {
        richResponseMessage: {
          submessages: [],
          messageType: 1,
          unifiedResponse: {
            data: Buffer.from(JSON.stringify(data)).toString('base64')
          },
          contextInfo: {
            mentionedJid: [],
            groupMentions: [],
            statusAttributions: [],
            forwardingScore: 1,
            isForwarded: true,
            forwardedAiBotMessageInfo: {
              botJid: META_AI_BOT_JID
            },
            forwardOrigin: FORWARD_ORIGIN_META_AI
          }
        }
      }
    }
  };
}

// FUNGSI EDIT PESAN MELALUI PROTOCOLMESSAGE TYPE 14
export async function editBotMessage(client, jid, originalMessageId, data) {
  const body = {
    botForwardedMessage: {
      message: {
        protocolMessage: {
          key: {
            remoteJid: jid,
            fromMe: true,
            id: originalMessageId
          },
          type: 14,
          editedMessage: makeBotMessage(data)
        }
      }
    }
  };
  return client.message.send(jid, body, {
    additionalAttributes: { type: 'text' }
  });
}

// PEMBUAT DATA UNIFIED UNTUK ELEMEN HTML
export function buildHtmlUnifiedData({
  html,
  responseId,
  trustedSources = ['nixel.dev', 'spotify.com', 'youtube.com', 'whatsapp.com', 'u.pone.rs', 'tiktok.com']
}) {
  const rid = responseId || crypto.randomUUID();
  return {
    response_id: rid,
    sections: [
      {
        view_model: {
          primitive: {
            __typename: 'GenAIaeacdsnwHtmlPrimitive',
            payload: html,
            trusted_sources: trustedSources
          },
          __typename: 'GenAISingleLayoutViewModel'
        }
      }
    ]
  };
}

// EKSEKUSI PENGIRIMAN HTML VIA GLITCH EDIT
export async function sendHtmlViaEditGlitch(client, jid, { html, trustedSources }, sendOpts = {}) {
  const responseId = crypto.randomUUID();
  const shellHtml = '<div style="padding:16px;font-family:system-ui;color:#fff;background:#121212;border-radius:12px">Menyiapkan…</div>';

  const shellData = buildHtmlUnifiedData({ html: shellHtml, responseId, trustedSources });
  const finalData = buildHtmlUnifiedData({ html, responseId, trustedSources });

  const sent = await client.message.send(jid, makeBotMessage(shellData), {
    additionalAttributes: { type: 'text' },
    ...sendOpts
  });

  const originalMessageId = sent?.key?.id || sent?.id || sent?.messageId;
  if (!originalMessageId) {
    throw new Error('GAGAL MENGAMBIL MESSAGE ID UNTUK EDIT GLITCH');
  }

  await new Promise(r => setTimeout(r, 250));

  try {
    await editBotMessage(client, jid, originalMessageId, shellData);
  } catch (e) {
    console.log('[HTML-EDIT] EDIT SHELL:', e?.message || e);
  }

  await new Promise(r => setTimeout(r, 250));
  await editBotMessage(client, jid, originalMessageId, finalData);

  return { sent, originalMessageId, responseId };
}
