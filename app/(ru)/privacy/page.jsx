import { LegalPage } from '../../../components/LegalPage.jsx';
import { CONTACT_EMAIL } from '../../../config.js';

export const metadata = {
  title: 'Политика конфиденциальности — StudyCrew',
  description: 'Какие данные хранит StudyCrew, кто их видит, кто их обрабатывает и как удалить аккаунт. Политика на русском и английском языках.',
};

const Mail = () => <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

export default function Page() {
  return (
    <LegalPage
      title="Политика конфиденциальности StudyCrew"
      enTitle="StudyCrew Privacy Policy"
      updated="11.11.2026"
      ru={<>
        <p>StudyCrew — приложение для Android, в котором друзья учатся вместе: таймер фокуса, групповой чат, домашние задания, серии дней и общая квартира. На этой странице объясняется, что приложение хранит, кто это видит и как всё удалить. По вопросам пишите на <Mail />.</p>

        <h2>Что хранится</h2>
        <p>Ваша электронная почта, отображаемое имя, имя пользователя и аватар. Группы, в которые вы вступили, ваши домашние задания и их фотографии, ваши сообщения и фотографии в них, пункты планировщика и цели (их видите только вы), время вашей учёбы (с предметом, если вы его выбрали; предмет видите только вы), монеты и серии, а также жалобы, которые вы отправили или которые касаются вас.</p>
        <p>Пока идёт сессия фокуса, приложение примерно раз в минуту сообщает серверу, что оно открыто, — чтобы сервер мог засчитать время. Приложение также хранит часовой пояс вашего телефона, чтобы дни учёбы и серия считались по вашей собственной полуночи. Приложение не использует вашу геолокацию.</p>
        <p>Если вы добавите на главный экран виджет Android, он показывает вашу серию на главном экране, где её может увидеть любой, кто посмотрит на ваш телефон.</p>
        <p>Если вы входите через Google, Google передаёт StudyCrew только ваше имя и адрес электронной почты. Других данных Google StudyCrew не получает.</p>
        <p>Камера используется только тогда, когда вы сами решаете сделать фотографию, чтобы прикрепить её. Фотографии, которые вы выбираете, берутся из системного выбора фото на телефоне. Микрофон приложение не использует.</p>

        <h2>Квартира группы</h2>
        <p>Если у вашей группы есть общая квартира, сервер хранит, какое место вы заняли, на перерыве ли вы, время, когда вас в последний раз видели в квартире (пока квартира открыта, приложение отправляет короткий сигнал), и вычисляемый по этому статус: учится, на перерыве, онлайн или отошёл. Участники группы видят ваше место и статус. Статусы «учится» и «на перерыве» можно скрыть настройкой «скрыть мой статус». Пузыри над персонажами показывают участникам группы последние сообщения группового чата.</p>

        <h2>Очки группы</h2>
        <p>У групп есть общие очки. Баланс группы и история вкладов с именами тех, кто их внёс, видны участникам группы. Если вы удалите аккаунт, ваши вклады останутся в истории группы без вашего имени.</p>

        <h2>Названия учебных комнат</h2>
        <p>У учебной комнаты может быть название. Название показывается людям из вашей группы.</p>

        <h2>StudyCrew Plus</h2>
        <p>У вашего аккаунта может быть статус StudyCrew Plus. Его включает администратор. В приложении нет платежей, и платёжные данные не хранятся.</p>

        <h2>Где данные хранятся и кто их обрабатывает</h2>
        <p>Данные вашего аккаунта и фотографии хранятся в Supabase — сервисе, на котором работает StudyCrew. Supabase, Expo (push-уведомления и обновления приложения), Google (Firebase Cloud Messaging) и Sentry (отчёты об ошибках) обрабатывают данные, чтобы приложение работало. Мы не продаём ваши данные, не показываем рекламу и не передаём данные рекламодателям. Данные передаются по HTTPS.</p>

        <h2>Отчёты об ошибках приложения</h2>
        <p>Когда в приложении происходит ошибка, оно может отправить отчёт в Sentry — сервис, который помогает нам исправлять проблемы. Это касается ошибок в самом приложении, а не сбоев в нативном коде телефона. В отчёте — технические сведения: текст ошибки, из которого удалены персональные данные там, где мы можем их обнаружить, версия приложения и Android, модель устройства. Мы не прикрепляем намеренно ваше имя, почту, аккаунт, сообщения или фотографии, но в тексте ошибки редко может оказаться то, что мы не смогли обнаружить. Sentry получает ваш IP-адрес при отправке отчёта, как любой веб-сервис. Мы настроили его так, чтобы адрес не сохранялся, хотя Sentry может определить по нему примерное местоположение.</p>

        <h2>Уведомления</h2>
        <p>Если вы включите уведомления, push-токен вашего телефона сохраняется в вашем аккаунте и отправляется в Expo (push-сервис, которым пользуется StudyCrew) и в Google (Firebase Cloud Messaging), которые доставляют уведомления на ваш телефон. Токен удаляется, когда вы выходите из аккаунта или удаляете его. В уведомлении никогда нет текста сообщения или домашнего задания: там написано что-то вроде «Новое сообщение от Ани». Каждый вид уведомлений можно отключить в Профиле или в настройках телефона.</p>

        <h2>Статистика использования</h2>
        <p>Пока вы вошли в аккаунт, приложение записывает, какими экранами и функциями вы пользуетесь, когда открываете его, и версию приложения. Это никогда не ваши сообщения, фотографии, домашние задания или почта. Статистика связана с вашим аккаунтом, чтобы мы видели, возвращаются ли люди и какие функции помогают. Её никому не показывают, а мы смотрим только итоги по группам не менее чем из 5 человек. Мы храним её 13 месяцев и удаляем вместе с вашим аккаунтом. Её можно отключить в Профиле: тогда собранное удаляется, а вы не входите в эти итоги, в том числе в подсчёты сессий учёбы, сообщений и домашних заданий, по которым мы смотрим, возвращаются ли люди.</p>

        <h2>Кто что видит</h2>
        <p>Любой, у кого есть аккаунт, может найти ваше имя, имя пользователя и аватар. Люди из ваших групп видят ваши сообщения и фотографии в группе, статусы ваших домашних заданий, время вашей учёбы и — в общей квартире — ваше место и статус. Фотографии домашних заданий получаете вы и проверяющие вашей группы. Групповой челлендж показывает участникам итог группы и сколько из них внесли вклад, но не кто именно. В группе из двух человек общий итог может показать вклад второго участника. Личные сообщения видите вы и друг, которому вы пишете.</p>

        <h2>Жалобы, блокировка и приостановка</h2>
        <p>Вы можете пожаловаться на человека или сообщение и заблокировать людей. В жалобе сохраняются причина, ваша заметка и копия сообщения, на которое пожаловались. Её читают модераторы, а человеку, на которого пожаловались, об этом не сообщают. Жалобы остаются после того, как любой из участников удалит аккаунт, — без имени этого человека. Мы можем приостановить аккаунт, нарушающий правила. Причину и действие мы храним для модерации.</p>

        <h2>Удаление аккаунта</h2>
        <p>В приложении откройте Профиль, затем «Удалить аккаунт». Шаги, а также что удаляется и что остаётся, описаны на странице <a href="/delete-account">как удалить аккаунт</a>. Ваш аккаунт и большая часть данных удаляются навсегда. Ваши личные переписки удаляются у обоих собеседников. Сообщения, которые вы отправили в групповых чатах, остаются без вашего имени, а эти фотографии остаются видимыми группе. Остальные файлы фотографий больше нельзя открыть в приложении, но они остаются в хранилище, пока кто-нибудь их не удалит. Если на момент удаления ваш аккаунт был приостановлен, мы храним зашифрованный код, полученный из вашей почты (не саму почту), чтобы её нельзя было использовать для нового аккаунта до конца срока приостановки, а после бана — никогда.</p>

        <h2>Возраст</h2>
        <p>Для использования StudyCrew вам должно быть не менее 13 лет. StudyCrew не рассчитан на детей младше 13 лет, и мы сознательно не собираем их данные. Если вы младше возраста цифрового согласия в вашей стране, сначала спросите родителя или опекуна. Если вы считаете, что приложением пользуется ребёнок младше 13 лет, напишите нам, и мы удалим аккаунт.</p>

        <h2>Изменения</h2>
        <p>StudyCrew находится на ранней стадии, поэтому функции и этот текст могут меняться. Дата вверху показывает последнее обновление.</p>

        <h2>Контакты</h2>
        <p>Вопросы о ваших данных: <Mail /></p>
      </>}
      en={<>
        <p className="legal__meta">Last updated: 2026-11-11</p>
        <p>StudyCrew is an Android app where friends study together: focus timer, group chat, homework, streaks and a shared apartment. This page explains what the app stores, who can see it, and how to delete it. For questions write to <Mail />.</p>

        <h2>What is stored</h2>
        <p>Your email, display name, username and avatar. The groups you join, your homework and its photos, your messages and the photos in them, your planner items and goals (only you can see them), your study time (with a subject, if you choose one, which only you can see), coins and streaks, and reports you send or that are about you.</p>
        <p>While a focus session runs, the app tells the server about once a minute that it is open, so the server can count the time. The app also stores your phone's time zone, so your study days and streak are counted by your own midnight. The app does not use your location.</p>
        <p>If you add the Android home-screen widget, it shows your streak on your home screen, where anyone who looks at your phone can see it.</p>
        <p>If you sign in with Google, Google shares only your name and email with StudyCrew. StudyCrew gets no access to any other Google data.</p>
        <p>The camera is used only when you choose to take a photo to attach. Photos you pick come from your phone's photo picker. The app does not use the microphone.</p>

        <h2>Group apartment</h2>
        <p>If your group has a shared apartment, the server stores which seat you took, whether you are on a break, the time you were last seen there (the app sends a short signal while the apartment is open), and a status computed from that: studying, on a break, online or away. Group members see your seat and status. You can hide your studying and break statuses with the “hide my status” setting. Chat bubbles above the characters show recent group messages to the group.</p>

        <h2>Group points</h2>
        <p>Groups have shared points. The group’s balance and a history of contributions, with the names of the people who added them, are visible to group members. If you delete your account, your contributions stay in the group’s history without your name.</p>

        <h2>Study room titles</h2>
        <p>A study room can have a title. The title is shown to the people in your group.</p>

        <h2>StudyCrew Plus</h2>
        <p>Your account can have StudyCrew Plus status. It is switched on by an admin. The app has no payments and stores no payment details.</p>

        <h2>Where it is stored and who processes it</h2>
        <p>Your account data and photos are stored with Supabase, the service StudyCrew runs on. Supabase, Expo (push notifications and app updates), Google (Firebase Cloud Messaging) and Sentry (error reports) process data for us to run the app. We do not sell your data, we do not show ads, and we do not share it with advertisers. Data is sent over HTTPS.</p>

        <h2>App error reports</h2>
        <p>When the app hits an error, it can send a report to Sentry, a service that helps us fix problems. This covers errors in the app itself, not crashes in the phone's native code. A report holds technical details: the error text with personal data removed where we can detect it, the app and Android version, and the device model. We do not attach your name, email, account, messages or photos on purpose, but an error's text could rarely contain something we fail to detect. Sentry receives your IP address when the report is sent, as any web service does. We set it not to store the address, though it may derive an approximate location.</p>

        <h2>Notifications</h2>
        <p>If you turn on notifications, your phone's push token is stored with your account and sent to Expo (the push service StudyCrew uses) and to Google (Firebase Cloud Messaging), which deliver the notifications to your phone. The token is removed when you sign out or delete your account. A notification never contains the text of a message or of your homework: it says things like "New message from Ana". You can switch each kind of notification off in Profile, or in your phone's settings.</p>

        <h2>Usage statistics</h2>
        <p>While you are signed in, the app records which screens and features you use, when you open it, and the app version. This is never your messages, photos, homework or email. It is linked to your account, so we can see whether people come back and which features help. It is never shown to anyone else, and we only look at group totals of at least 5 people. We keep it for 13 months and delete it with your account. You can turn it off in Profile: that deletes what was collected and leaves you out of these totals, including the counts of study sessions, messages and homework that we use to see whether people come back.</p>

        <h2>Who sees what</h2>
        <p>Anyone with an account can find your name, username and avatar. People in your groups see your group messages and photos, your homework statuses, your study time and, in a shared apartment, your seat and status. Homework photos go to you and your group's reviewers. A group challenge shows its members the group's total and how many of them added to it, not who did. In a group of two, the group total can show the other member's contribution. Private messages go to you and the friend you are writing to.</p>

        <h2>Reports, blocking and suspension</h2>
        <p>You can report a person or a message and block people. A report keeps the reason, your note and a copy of the reported message. Moderators read it, and the reported person is not told. Reports stay after either person deletes their account, without that person's name. We can suspend an account that breaks the rules. We keep the reason and the action for moderation.</p>

        <h2>Deleting your account</h2>
        <p>In the app go to Profile, then Delete account. See <a href="/delete-account">how to delete your account</a> for the steps, what is removed and what stays. Your account and most of your data are removed for good. Your private conversations are deleted for both people. Messages you sent in group chats stay without your name, and those photos stay visible to the group. Other photo files can no longer be opened in the app, but stay in storage until someone removes them. If your account is suspended when you delete it, we keep a scrambled code made from your email, not the email itself, so it cannot be used for a new account until the suspension would have ended, or ever after a ban.</p>

        <h2>Age</h2>
        <p>You must be at least 13 to use StudyCrew. StudyCrew is not designed for children under 13 and we do not knowingly collect their data. If you are under the age of digital consent in your country, ask a parent or guardian first. If you believe a child under 13 uses the app, write to us and we will delete the account.</p>

        <h2>Changes</h2>
        <p>StudyCrew is in an early stage, so features and this text can change. The date at the top shows the latest update.</p>

        <h2>Contact</h2>
        <p>Questions about your data: <Mail /></p>
      </>}
    />
  );
}
