# PetHealthCalendar Design System

## Product Type

Mobile-first utility app for pet health reminders. The interface should feel calm, trustworthy, warm, and quick to operate.

## UX Principles

- The first screen answers one question: what should I do next?
- Every primary action must have a visible touch target of at least 88rpx height.
- Use visible labels for forms. Place errors close to the field.
- Avoid medical certainty. Use reminder and record language, not diagnosis language.
- Avoid visual clutter. MVP pages should expose the next action, then supporting details.
- Color must not be the only status signal. Pair color with text labels.

## Visual Style

- Style: warm minimal utility.
- Surfaces: soft off-white background with white panels.
- Radius: 12rpx for panels and controls, 999rpx only for chips/tags.
- Elevation: mostly border-based, with one subtle shadow only for the key focus card.
- Typography: system sans-serif, no negative letter spacing.
- Icons: no emoji as structural icons. This MVP uses text labels until an icon library is introduced.

## Color Tokens

- Page: `#f7f8f4`
- Surface: `#ffffff`
- Surface muted: `#f0f4ee`
- Primary: `#2f6f5e`
- Primary pressed: `#265b4d`
- Primary soft: `#e6f2ed`
- Text strong: `#1f2d28`
- Text normal: `#3f4e47`
- Text muted: `#758078`
- Border: `#dce4d8`
- Warning: `#9a5a12`
- Warning soft: `#fff4dc`
- Danger: `#a23e36`
- Danger soft: `#ffe8e5`

## Spacing

- Page inset: 32rpx
- Section gap: 24rpx
- Panel padding: 28rpx
- Control gap: 16rpx
- Field gap: 24rpx

## Components

- Primary button: one per screen, filled primary.
- Secondary button: outline primary.
- Danger button: red outline/soft background.
- Form input: 88rpx minimum height, visible label, helper or error text below.
- Status tag: text plus semantic color. Do not rely on color alone.
- Empty state: short message plus one action.

## Page Rules

- Home: prioritize next reminder card, then the list.
- Pet form: keep required fields minimal. Unknown dates are allowed.
- Detail: date editing and completion must be obvious.
- Record form: show next reminder date as editable, not hidden automation.
- History: scan-friendly timeline list, newest first.
