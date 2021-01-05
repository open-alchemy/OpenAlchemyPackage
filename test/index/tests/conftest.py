"""Fixtures."""

from urllib import request

import pytest


@pytest.fixture()
def spec_id(access_token):
    """Returns a spec id that is cleaned up at the end."""
    spec_id_value = "index-spec-id1"

    yield spec_id_value

    delete_request = request.Request(
        f"https://package.api.openalchemy.io/v1/specs/{spec_id_value}",
        headers={"Authorization": f"Bearer {access_token}"},
        method="DELETE",
    )
    with request.urlopen(delete_request) as response:
        assert response.status == 204
