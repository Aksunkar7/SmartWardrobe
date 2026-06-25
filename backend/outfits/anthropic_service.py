import anthropic
from decouple import config

client = anthropic.Anthropic(api_key=config('ANTHROPIC_API_KEY'))

def get_outfit_recommendation(wardrobe_items):
    if not wardrobe_items:
        return "Ваш гардероб пуст. Добавьте вещи чтобы получить рекомендацию."

    items_text = "\n".join([
        f"- {item.name} (категория: {item.category}, цвет: {item.color}, сезон: {item.season})"
        for item in wardrobe_items
    ])

    message = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": f"""Ты персональный стилист. Отвечай на русском языке.

У пользователя есть следующие вещи в гардеробе:
{items_text}

Пожалуйста:
1. Порекомендуй 2-3 лучших аутфита из этих вещей
2. Объясни почему эти вещи хорошо сочетаются
3. Дай один совет по улучшению гардероба

Отвечай кратко и по делу."""
            }
        ]
    )
    return message.content[0].text