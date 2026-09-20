# BB610 Garden — локальный редизайн

Рабочая React + TypeScript версия сайта [garden.bb610.com.ua](https://garden.bb610.com.ua/). Локальный production preview: **http://localhost:5173/**. Ничего не опубликовано.

## Реализация

- Авторская дизайн-система: глубокий зелёный, лаймовый акцент, Manrope, DM Sans, редакционная типографика.
- Все основные разделы оригинала: Garden, PlantLogic, лохина, Rubus, Drainage Collection, лизиметр, продукт #1304125, контакты.
- Интерактивные этапы системы с клавиатурной навигацией, карточки продуктов, мобильное меню, форма запроса.
- Motion + адаптированный Magic UI BlurFade, собственные CSS hover-анимации, pointer spotlight по рекомендациям 21st.dev.
- Доступные модальные окна на основе shadcn/ui / Radix: focus trap, Escape, возврат фокуса. Анимации учитывают prefers-reduced-motion.
- Локальные шрифты и фотографии, WebP, адаптивный hero srcset, lazy loading. Внешние сервисы для отображения не нужны.
- Украинские SEO-метаданные, canonical, JSON-LD, favicon, Open Graph 1200×630, robots.txt и sitemap.xml.

## Форма

На исходном сайте указан `info@bb610.com.ua`, серверного API приёма заявок нет. Форма валидирует данные и готовит письмо этому адресату. Посетитель проверяет текст и открывает свою почту; предусмотрены копирование и сохранение TXT. Сайт не утверждает, что письмо уже отправлено, и не хранит персональные данные. Для автоматической отправки в будущем понадобится отдельно согласованное серверное подключение.

## Локальная разработка

```sh
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

Dev и preview используют только `127.0.0.1:5173`, одновременно запускается один сервер. Текущий preview обслуживает `dist/`. После изменения исходников его содержимое обновляется командой сборки.

## Источники и компоненты

- Тексты, параметры продуктов, контакты и медиа: [BB610 Garden](https://garden.bb610.com.ua/). Карта оригинальных путей — `public/media/sources.json`. Все фотографии показывают исходные материалы бренда.
- [21st.dev: Spotlight Card](https://21st.dev/aceternity/card-spotlight/default), [руководство по производительному spotlight](https://21st.dev/blog/react-spotlight-effect-components): локальная CSS-реализация без React-обновлений на каждое движение указателя.
- [shadcn/ui Dialog](https://ui.shadcn.com/docs/components/radix/dialog): исходник из официального реестра, адаптирован к авторскому CSS и локализован.
- [Magic UI BlurFade](https://magicui.design/docs/components/blur-fade): исходник из официального реестра, адаптирован к Motion и reduced motion.
- [Motion](https://motion.dev/docs/react), Radix Tabs, Lucide.

## Перед возможной публикацией

Публикация не выполнялась. Open Graph, canonical и sitemap используют целевой домен Garden. Коммерческие цены, дополнительные услуги, статистика и обещания не добавлялись.
