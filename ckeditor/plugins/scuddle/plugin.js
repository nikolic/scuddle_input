CKEDITOR.plugins.add( 'scuddle',
{
	init: function( editor )
	{
		//Plugin logic goes here.
		editor.addCommand( 'limitScuddle',
		{
			exec : function( editor )
			{    
				var timestamp = new Date();
				editor.insertHtml( 'The current date and time is: <em>' + timestamp.toString() + '</em>' );
			}
		});

		editor.ui.addButton( 'Scuddle',
		{
			label: 'Limit Scuddle',
			command: 'limitScuddle',
			icon: this.path + 'images/scuddle.png'
		} );
	}
} );