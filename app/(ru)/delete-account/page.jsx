import { LegalPage } from '../../../components/LegalPage.jsx';
import { CONTACT_EMAIL } from '../../../config.js';

export const metadata = {
  title: 'Удаление аккаунта StudyCrew',
  description: 'Как удалить аккаунт StudyCrew в приложении или по письму, что удаляется и что может остаться. Текст на русском и английском языках.',
};

const Mail = ({ subject }) => (
  <a href={`mailto:${CONTACT_EMAIL}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`}>{CONTACT_EMAIL}</a>
);

export default function Page() {
  return (
    <LegalPage
      title="Удаление аккаунта StudyCrew"
      enTitle="Delete your StudyCrew account"
      updated="11.11.2026"
      ru={<>
        <p>Приложение: StudyCrew (Android).</p>

        <h2>Удалите аккаунт в приложении</h2>
        <ol>
          <li>Откройте StudyCrew и войдите в аккаунт.</li>
          <li>Перейдите на вкладку <strong>Профиль</strong>.</li>
          <li>Нажмите <strong>Удалить аккаунт</strong>.</li>
          <li>Прочитайте предупреждение, введите слово, которое попросит приложение, чтобы подтвердить, и нажмите <strong>Удалить мой аккаунт</strong>.</li>
        </ol>
        <p>Удаление нельзя отменить. Когда оно завершится, вы выйдете из аккаунта.</p>

        <h2>Не можете открыть приложение или потеряли доступ?</h2>
        <p>Напишите на <Mail subject="StudyCrew account deletion" /> с темой письма «StudyCrew account deletion». Пишите с того адреса электронной почты, с которого регистрировались, чтобы мы могли убедиться, что аккаунт ваш. Не присылайте пароль. Мы можем задать вам вопрос, чтобы убедиться, что это вы, и после этого удалим аккаунт. Мы отвечаем так быстро, как можем.</p>

        <h2>Что удаляется</h2>
        <ul>
          <li>Ваш профиль, имя пользователя и аватар.</li>
          <li>Ваше членство в группах, статусы домашних заданий и отправленные фотографии домашних заданий.</li>
          <li>Ваши личные (прямые) переписки — они удаляются у обоих собеседников.</li>
          <li>Ваши друзья, заявки в друзья и блокировки.</li>
          <li>Время вашей учёбы, монеты, данные о сериях, пункты планировщика и цели.</li>
          <li>Ваша статистика использования, настройки уведомлений и push-токен.</li>
          <li>Ваше место и статус в квартирах групп.</li>
        </ul>
        <p>Группа, которой вы владеете, переходит к другому участнику. Группа, в которой больше никого нет, удаляется.</p>

        <h2>Что может остаться</h2>
        <ul>
          <li>Сообщения, которые вы отправили в групповых чатах, остаются без вашего имени, а отправленные там фотографии остаются видимыми участникам этой группы.</li>
          <li>Домашние задания, которые вы добавили в группу, остаются без вашего имени.</li>
          <li>Жалобы, которые вы отправили или которые касаются вас, остаются без вашего имени, вместе с копией сообщения, на которое пожаловались, — для модерации.</li>
          <li>Файлы остальных ваших фотографий (из личных чатов и домашних заданий) больше нельзя открыть в приложении, но они остаются в хранилище, пока их не удалят.</li>
          <li>Если на момент удаления ваш аккаунт был приостановлен, мы храним зашифрованный код, полученный из вашей почты (не саму почту), чтобы её нельзя было использовать для нового аккаунта до конца срока приостановки, а после бана — никогда.</li>
          <li>Отчёты об ошибках, уже отправленные в наш сервис ошибок, не содержат данных аккаунта. Очки группы, заработанные в группе, могут остаться в общем итоге этой группы без вашего имени.</li>
        </ul>

        <p>Подробнее: <a href="/privacy">Политика конфиденциальности</a>.</p>
      </>}
      en={<>
        <p className="legal__meta">App: StudyCrew (Android). Last updated: 2026-11-11</p>

        <h2>Delete it in the app</h2>
        <ol>
          <li>Open StudyCrew and sign in.</li>
          <li>Go to the <strong>Profile</strong> tab.</li>
          <li>Tap <strong>Delete account</strong>.</li>
          <li>Read the warning, type the word the app asks for to confirm, and tap <strong>Delete my account</strong>.</li>
        </ol>
        <p>The deletion cannot be undone. You are signed out when it finishes.</p>

        <h2>Cannot open the app, or you lost access?</h2>
        <p>Email <Mail subject="StudyCrew account deletion" /> with the subject "StudyCrew account deletion". Write from the email address you used to sign up, so we can confirm the account is yours. Do not send your password. We may ask you a question to confirm it is you, and we will delete the account after that. We answer as soon as we can.</p>

        <h2>What is deleted</h2>
        <ul>
          <li>Your profile, username and avatar.</li>
          <li>Your group memberships, homework statuses and homework photo submissions.</li>
          <li>Your private (direct) conversations, deleted for both people.</li>
          <li>Your friends, friend requests and blocks.</li>
          <li>Your study time, coins, streak data, planner items and goals.</li>
          <li>Your usage statistics, notification settings and push token.</li>
          <li>Your seat and status in group apartments.</li>
        </ul>
        <p>A group you own passes to another member. A group with nobody else in it is deleted.</p>

        <h2>What may remain</h2>
        <ul>
          <li>Messages you sent in group chats stay without your name, and photos you sent there stay visible to that group's members.</li>
          <li>Homework you added to a group stays without your name.</li>
          <li>Reports you sent, or that are about you, stay without your name, with a copy of the reported message, for moderation.</li>
          <li>Files of your other photos (private chats and homework) can no longer be opened in the app, but stay in storage until they are removed.</li>
          <li>If your account was suspended when you deleted it, we keep a scrambled code made from your email, not the email itself, so it cannot be used for a new account until the suspension would have ended, or ever after a ban.</li>
          <li>Error reports already sent to our error service contain no account data. Group points earned in a group may stay in that group's total without your name.</li>
        </ul>

        <p>More details: <a href="/privacy">Privacy Policy</a>.</p>
      </>}
    />
  );
}
