import { LegalPage } from '../../../components/LegalPage.jsx';
import { CONTACT_EMAIL } from '../../../config.js';

export const metadata = {
  title: 'Правила сообщества — StudyCrew',
  description: 'Простые правила StudyCrew: доброжелательность, приватность, никакого спама, жалобы и блокировка. Текст на русском и английском языках.',
};

const Mail = () => <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

export default function Page() {
  return (
    <LegalPage
      title="Правила сообщества StudyCrew"
      enTitle="StudyCrew Community Rules"
      updated="11.11.2026"
      ru={<>
        <p>StudyCrew — приложение для учёбы для людей от 13 лет. Несколько простых правил помогают сохранять дружелюбную атмосферу для всех.</p>

        <h2>Будьте добры</h2>
        <p>Относитесь к людям так, как в настоящей учебной группе. Никакой травли, преследований, угроз и ненависти к кому-либо, ни по какой причине.</p>

        <h2>Держите всё в чистоте</h2>
        <p>Никакого сексуального контента, наготы, жестокости и натуралистичных сцен. Помните, что здесь много подростков.</p>

        <h2>Уважайте приватность</h2>
        <p>Не делитесь чужой личной информацией и фотографиями без согласия этих людей. Это относится к адресам, номерам телефонов, паролям и скриншотам личных чатов.</p>

        <h2>Никакого спама и мошенничества</h2>
        <p>Никакого спама, рекламы, мошенничества и ссылок, которые пытаются обмануть людей. Нельзя продавать сочинения, готовые ответы на домашние задания и другие услуги для списывания.</p>

        <h2>Придерживайтесь темы — примерно</h2>
        <p>Групповые чаты — для учёбы и дружеского общения. Немного не по теме — нормально. Засорять чат — нет.</p>

        <h2>Жалуйтесь и блокируйте</h2>
        <p>Если что-то кажется неправильным, нажмите на сообщение и удерживайте или откройте профиль человека, чтобы пожаловаться на него, либо заблокируйте его, чтобы больше его не видеть. Жалобы читают модераторы, а другому человеку об этом не сообщают.</p>

        <h2>Что могут делать модераторы</h2>
        <p>Модераторы могут удалять контент, отключать людям возможность писать в группе и приостанавливать или блокировать аккаунты, нарушающие эти правила.</p>

        <h2>Контакты</h2>
        <p>Вопросы или что-то срочное: <Mail /></p>

        <p>См. также <a href="/privacy">Политику конфиденциальности</a>.</p>
      </>}
      en={<>
        <p className="legal__meta">Last updated: 2026-11-11</p>
        <p>StudyCrew is a study app for people aged 13 and older. A few simple rules keep it friendly for everyone.</p>

        <h2>Be kind</h2>
        <p>Treat people the way you would in a real study group. No bullying, harassment, threats or hate towards anyone, for any reason.</p>

        <h2>Keep it clean</h2>
        <p>No sexual content, nudity or anything graphic or violent. Remember that many people here are teenagers.</p>

        <h2>Respect privacy</h2>
        <p>Don’t share other people’s private information or photos without their consent. That includes addresses, phone numbers, passwords and screenshots of private chats.</p>

        <h2>No spam or scams</h2>
        <p>No spam, advertising, scams or links that try to trick people. No selling essays, homework answers or other cheating services.</p>

        <h2>Keep chats on topic-ish</h2>
        <p>Group chats are for studying and for friendly talk. A little off-topic is fine. Flooding the chat is not.</p>

        <h2>Report and block</h2>
        <p>If something feels wrong, long press a message or open a person’s profile to report them, or block them so you don’t see them. Reports are read by moderators and the other person isn’t told.</p>

        <h2>What moderators can do</h2>
        <p>Moderators can remove content, mute people in a group and suspend or ban accounts that break these rules.</p>

        <h2>Contact</h2>
        <p>Questions or something urgent: <Mail /></p>

        <p>See also the <a href="/privacy">Privacy Policy</a>.</p>
      </>}
    />
  );
}
