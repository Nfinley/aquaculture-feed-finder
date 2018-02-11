import es
import random
import uuid

nouns = [
        'carp',
        'cat',
        'dog',
        'bird',
        'salmon',
        'crab',
        'heron',
        'budgie',
        'hotdog',
        'tiger',
        'buffalo',
        'parrot',
        'pickle',
        'hamster',
        ]

adjs = [
        'blue',
        'green',
        'raging',
        'aggressive',
        'fat',
        'red',
        'pink',
        'tyrannical',
        'blushing',
        'complacent',
        'metallic',
        'angry',
        'battered',
        ]


if __name__ == '__main__':
    for i in range(99):
        noun = random.choice(nouns)
        adj = random.choice(adjs)
        id = str(uuid.uuid4())
        model = {
                'name': ' '.join([adj, noun]),
                'id': id,
                'size': i,
                }
        es.post_to_es(model, id)
        print(model)

