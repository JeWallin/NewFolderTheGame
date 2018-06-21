class worldObject{
	constructor(position, size)
	{
		this.position 	= position;
		this.size 		= size;
	}
}

var mapstringglobal = undefined;

class MapManager
{
	constructor(gameSize)
	{
		console.log("MapManager constructed");
		this.gameSize 		= gameSize;
		this.mapString 		= {};
		this.scale			= undefined;
		this.WorldMap 		= [];
		this.PlayerStart 	= [];
	}

	Reset()
	{
		this.mapString = {};

		this.WorldMap = [];
		this.PlayerStart = [];
		mapstringglobal = undefined;
	}
	
	LoadMap(MapFile)
	{
		this.Reset();
		
		var input = MapFile.target;

	    var reader = new FileReader();

	    reader.onload = function(){
	          mapstringglobal = reader.result;
	          MapIsloaded();
	    };

	    reader.readAsText(input.files[0]);
	}

	NotifySubscribers()
	{
		InitGameNow();
	}

	ResetVarialbes()
	{
		this.WorldMap.splice(0, this.WorldMap.length);
		this.PlayerStart.splice(0, this.PlayerStart.length);
	}

	LayoutSize()
	{
		var width 	= -1;
		var height 	= 1;
		var rowDone	= false;

		for( var i = 0; i < this.mapString.length; i++)
		{
			if (!rowDone)
			{
				width += 1;
			}
			if( this.mapString[i] === '\n' )
			{
				height += 1;
				rowDone = true;
			}
		}
		return new vector2d( width, height );
	}

	GenerateMap()
	{
		this.ResetVarialbes();
		this.mapString = mapstringglobal;

		var layoutSize = this.LayoutSize();
		this.scale = new vector2d( this.gameSize.x/layoutSize.x, this.gameSize.y/layoutSize.y );

		var x = 0;
		var y = 0;

		for (var i = 0; i < this.mapString.length; i++)
		{
			if ( this.mapString[i] === '\n' )
			{
				x = -1;
				y += 1;
			}
			else if ( this.mapString[i] === 'x')
			{
				var pos = new vector2d( x*this.scale.x+this.scale.x/2, y*this.scale.y + this.scale.y/2 );
				this.WorldMap.push(pos);
			}
			else if (this.mapString[i] === 'p')
			{
				var pos = new vector2d( x*this.scale.x +this.scale.x/2, y*this.scale.y + this.scale.y/2 );
				this.PlayerStart.push(pos);
			}
			x++;
		}
		this.NotifySubscribers();
	}

	// Get

	GetWorldObjects()
	{
		return this.WorldMap;
	}

	GetPlayerLocations()
	{
		return this.PlayerStart;
	}

	GetScale()
	{
		return this.scale;
	}
}