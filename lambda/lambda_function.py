from response import respond
import es


def lambda_handler(event, context):
    query_params = 'queryStringParameters'
    if query_params in event and event[query_params]:
        params = event[query_params]
        species = None if not 'species' in params else params['species']
        lifestage = None if not 'lifestage' in params else params['lifestage']
        location = None if not 'location' in params else params['location']
        data = es.search_es(species, lifestage, location)
    else:
        data = es.get_all()
    data = [item['_source'] for item in data]
    res = {
        'data': data
        }
    return respond(None, res)
