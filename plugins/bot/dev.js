// plugins/bot/dev.js
// MENAMPILKAN KARTU PROFIL GENAI DEVELOPER DENGAN PROTOCOLMESSAGE TYPE 14 EDIT GLITCH
import crypto from 'node:crypto';
import {
  makeBotMessage,
  editBotMessage
} from '../../lib/richantidownload.js';

// MERAKIT DATA UNIFIED UNTUK ELEMEN IMAGINE DAN COMPACTENTITY
function buildImagineUnifiedData({
  bannerUrl,
  avatarUrl,
  title,
  subtitle,
  secondarySubtitle,
  entityUrl,
  responseId,
  status = 'READY'
}) {
  const rid = responseId || crypto.randomUUID();

  const imaginePrimitive =
    status === 'GENERATING'
      ? {
          media: {
            url: '',
            mime_type: 'image/jpeg',
            width: 16,
            height: 9
          },
          imagine_type: 'IMAGE',
          status: {
            status: 'GENERATING',
            estimated_completion_time: Math.floor(Date.now() / 1000) + 6
          },
          __typename: 'GenAIImaginePrimitive'
        }
      : {
          media: {
            url: bannerUrl,
            mime_type: 'image/jpeg',
            width: 16,
            height: 9
          },
          imagine_type: 'IMAGE',
          status: { status: 'READY' },
          __typename: 'GenAIImaginePrimitive'
        };

  return {
    response_id: rid,
    sections: [
      {
        view_model: {
          primitive: imaginePrimitive,
          __typename: 'GenAISingleLayoutViewModel'
        }
      },
      {
        view_model: {
          primitive: {
            __typename: 'GenAICompactEntityPrimitive',
            title,
            subtitle,
            secondary_subtitle: secondarySubtitle,
            entity_id: 867051314767696,
            entity_url: entityUrl,
            entity_type: 'PAGE',
            action_type: 'FOLLOW',
            is_verified: true,
            image: {
              url: avatarUrl || '',
              url_fallback: avatarUrl || ''
            }
          },
          __typename: 'GenAISingleLayoutViewModel'
        }
      }
    ]
  };
}

// EKSEKUSI PENGIRIMAN KARTU GENAI VIA EDIT GLITCH
async function sendDevCard(client, jid, opts = {}) {
  const {
    bannerUrl = 'https://u.pone.rs/xoprxykp.jpg',
    avatarUrl = 'https://u.pone.rs/ndvdysro.jpg',
    title = 'adamnurs_',
    subtitle = 'TikTok Creator',
    secondarySubtitle = '@karinnchans_',
    entityUrl = 'https://tiktok.com/@karinnchans_'
  } = opts;

  const responseId = crypto.randomUUID();

  const shellData = buildImagineUnifiedData({
    bannerUrl: '',
    avatarUrl: '',
    title,
    subtitle,
    secondarySubtitle,
    entityUrl,
    responseId,
    status: 'GENERATING'
  });

  const finalData = buildImagineUnifiedData({
    bannerUrl,
    avatarUrl,
    title,
    subtitle,
    secondarySubtitle,
    entityUrl,
    responseId,
    status: 'READY'
  });

  // 1. KIRIM PESAN AWAL STATUS GENERATING
  const sent = await client.message.send(jid, makeBotMessage(shellData), {
    additionalAttributes: { type: 'text' }
  });

  const originalMessageId = sent?.key?.id || sent?.id || sent?.messageId;
  if (!originalMessageId) {
    throw new Error('GAGAL MENGAMBIL MESSAGE ID AWAL');
  }

  await new Promise((resolve) => setTimeout(resolve, 250));

  // 2. KUNCI GLITCH DENGAN MENIMPA PESAN SHELL
  try {
    await editBotMessage(client, jid, originalMessageId, shellData);
  } catch (e) {
    console.log('[DEV] EDIT SHELL:', e?.message || e);
  }

  await new Promise((resolve) => setTimeout(resolve, 250));

  // 3. EDIT PESAN KE STATUS READY FINAL
  await editBotMessage(client, jid, originalMessageId, finalData);

  return { sent, originalMessageId, responseId };
}

export default {
  command: 'dev',
  alias: ['developer'],
  category: 'bot',
  description: '> Menampilkan kartu interaktif profil developer bot.',
  typing: true,

  async execute(m, { sock }) {
    const client = sock || m.client || global.sock;
    const jid = m.chat || m.id;

    if (m.react) await m.react('⏳');

    try {
      await sendDevCard(client, jid, {
        bannerUrl: 'https://u.pone.rs/xoprxykp.jpg',
        avatarUrl: 'https://u.pone.rs/ndvdysro.jpg',
        title: 'adamnurs_',
        subtitle: 'TikTok Creator',
        secondarySubtitle: '@karinnchans_',
        entityUrl: 'https://tiktok.com/@karinnchans_'
      });

      if (m.react) await m.react('✅');
    } catch (e) {
      console.error('[DEV ERROR]:', e);
      if (m.react) await m.react('❌');
      await m.reply(`❌ GAGAL MENAMPILKAN KARTU DEVELOPER:\n_${e.message || e}_`);
    }
  }
};