import request.request as req

def add_critiques(data):
    if (
        not "attraction_id" in data
        or not "nom" in data
        or not "prenom" in data
        or not "texte" in data
        or not "note" in data
    ):
        return False

    requete = """
        INSERT INTO critiques (attraction_id, nom, prenom, texte, note)
        VALUES (?, ?, ?, ?, ?);
    """

    id = req.insert_in_db(
        requete,
        (
            data["attraction_id"],
            data["nom"],
            data["prenom"],
            data["texte"],
            data["note"],
        ),
    )

    return id

def get_all_critiques():
    json = req.select_from_db("SELECT * FROM critiques")

    return json

def get_paginated_critiques(page_size=10, page_index=1):
    # Calculate the offset based on page size and index
    offset = (page_index - 1) * page_size

    # Fetch paginated critiques with attraction names from the database
    requete = f"""
        SELECT c.*, a.nom as attraction_nom
        FROM critiques c
        JOIN attraction a ON c.attraction_id = a.attraction_id
        ORDER BY c.id DESC
        LIMIT {page_size} OFFSET {offset}
    """
    paginated_critiques = req.select_from_db(requete)

    # Get the total number of critiques (for pagination info)
    total_critiques = len(req.select_from_db("SELECT * FROM critiques"))

    return {
        'critiques': paginated_critiques,
        'totalCritiques': total_critiques,
    }

def get_critiques_for_attraction(page_size=10, page_index=1, attraction_id=1):

    # Calculate the offset based on page size and index
    offset = (page_index - 1) * page_size

    # Fetch paginated critiques with attraction names from the database
    requete = f"""
        SELECT c.*, a.nom as attraction_nom
        FROM critiques c
        JOIN attraction a ON c.attraction_id = a.attraction_id
        WHERE c.attraction_id = ?  -- Filter critiques for the specified attraction_id
        ORDER BY c.id DESC  -- Order by id in descending order
        LIMIT {page_size} OFFSET {offset}
    """

    paginated_critiques = req.select_from_db(requete, (attraction_id,))
    # Get the total number of critiques for the specified attraction (for pagination info)
    total_critiques = len(req.select_from_db("SELECT * FROM critiques WHERE attraction_id = ?", (attraction_id,)))

    return {
        'critiques': paginated_critiques,
        'totalCritiques': total_critiques,
    }

def get_critiques(id):
    if not id:
        return False

    json = req.select_from_db(
        "SELECT * FROM critiques WHERE id = ?",
        (id,),
    )

    if len(json) > 0:
        return json[0]
    else:
        return []

def delete_critiques(id):
    if not id:
        return False

    req.delete_from_db("DELETE FROM critiques WHERE id = ?", (id,))

    return True

def update_critiques(data):
    if (
        not "id" in data
        or not "attraction_id" in data
        or not "nom" in data
        or not "prenom" in data
        or not "texte" in data
        or not "note" in data
    ):
        return False

    requete = """
        UPDATE critiques
        SET attraction_id=?, nom=?, prenom=?, texte=?, note=?
        WHERE id = ?;
    """

    req.insert_in_db(
        requete,
        (
            data["attraction_id"],
            data["nom"],
            data["prenom"],
            data["texte"],
            data["note"],
            data["id"],
        ),
    )

    return True
